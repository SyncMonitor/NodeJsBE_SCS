import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SensorScrapingDto } from './dto/sensor-scraping.dto';
import { firstValueFrom, from } from 'rxjs';
import { xml2js } from 'xml-js';
import { DtoValidatorService } from 'src/dto-validator/dto-validator.service';
import { Sensor } from 'src/sensors/entities/sensor.entity';
import { SensorScrapingDtoToSensorAutomapper } from 'src/automapper-custom/sensor-scraping-dto-to-sensor.automapper';
import { SensorsService } from 'src/sensors/sensors.service';
import { SensorScrapingDtoToParkingSensorAutomapper } from 'src/automapper-custom/sensor-scraping-dto-to-parking-sensor.automapper';
import { ParkingSensorsService } from 'src/parking-sensors/parking-sensors.service';
import { ParkingSensor } from 'src/parking-sensors/entities/parking-sensor.entity';
import { SensorMaintenance } from 'src/sensors-maintenance/entities/sensor-maintenance.entity';
import { SensorsMaintenanceService } from 'src/sensors-maintenance/sensors-maintenance.service';

@Injectable()
export class SensorsScrapingService{
    private readonly logger = new Logger(SensorsScrapingService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly dtoValidatorService: DtoValidatorService,
        private readonly sensorService: SensorsService,
        private readonly parkingSensorsService: ParkingSensorsService,
        private readonly sensorsMaintenanceService: SensorsMaintenanceService,
        private readonly sensorScrapingDtoToSensorAutomapper: 
            SensorScrapingDtoToSensorAutomapper,
        private readonly sensorScrapingDtoToParkingSensorAutomapper: 
            SensorScrapingDtoToParkingSensorAutomapper,
        ){}

    @Cron('*/2 * * * *')
    async scrapeAndPersistSensors() {
        this.logger.log('Started scraping sensors...');

        const sensorScrapingDto: SensorScrapingDto[] = await this.getSensorsScrapingDto();
        let sensors: Sensor[] = this.mapSensorScrapingDtoToSensor(sensorScrapingDto);
        const parkingSensors: ParkingSensor[] = this.mapSensorScrapingDtoToParkingSensor(sensorScrapingDto);

        const sensorsResponse = await this.saveSensorsToDatabase(sensors);
        const parkingSensorsResponse = await this.saveParkingSensorsToDatabase(parkingSensors);
        const sensorsMaintenanceResponse = await this.addSensorsMaintenanceToSensors();
        
        this.logger.log('Finished scraping sensors');
    }

    async getSensorsScrapingDto(): Promise<SensorScrapingDto[]>{
        const response = await firstValueFrom(this.httpService.get('https://syncmonitor.altervista.org/smartcitysim/smartParkingSensors.xml'))
        
        const sensors: SensorScrapingDto[] = this.xmlToSensorObjectArray(response.data);

        if(!this.dtoValidatorService.checkDtoConsistencyArray(new SensorScrapingDto(), sensors))
            throw new Error('Sensors parameters are not as expected!');
        
        return sensors;
    }

    saveSensorsToDatabase(sensors: Sensor[]){
        return this.sensorService.createOrUpdateSensors(sensors);
    }

    saveParkingSensorsToDatabase(parkingSensors: ParkingSensor[]){
        return this.parkingSensorsService.createOrUpdateParkingSensors(parkingSensors);
    }

    saveSensorsMaintenanceToDatabase(sensorsMaintenance: SensorMaintenance[]){
        return this.sensorsMaintenanceService
            .createSensorsMaintenance(sensorsMaintenance);
    }

    mapSensorScrapingDtoToSensor(sensorScrapingDto: SensorScrapingDto[]): Sensor[]{
        return this.sensorScrapingDtoToSensorAutomapper
            .mapFromArray(sensorScrapingDto);
    }

    mapSensorScrapingDtoToParkingSensor(sensorScrapingDto: SensorScrapingDto[]): ParkingSensor[]{
        return this.sensorScrapingDtoToParkingSensorAutomapper
            .mapFromArray(sensorScrapingDto);
    }

    xmlToSensorObjectArray(xml){
       const result = xml2js(xml, {compact: false})

       const sensors = result.elements[0].elements
        .map(item => item.attributes)

       return sensors
    }

    async addSensorsMaintenanceToSensors(): Promise<SensorMaintenance[]>{
        const sensorsWithoutSensorMaintenance = 
            await this.sensorService.getSensorsWithoutSensorMaintenance();
        const sensorsMaintenance: SensorMaintenance[] = 
            this.sensorsMaintenanceService
                .createArrayOfSensorsMaintenance(sensorsWithoutSensorMaintenance);

        return this.saveSensorsMaintenanceToDatabase(sensorsMaintenance);
    }
}
