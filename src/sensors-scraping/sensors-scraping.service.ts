import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SensorScrapingDto } from './dto/sensor-scraping.dto';
import { firstValueFrom, from } from 'rxjs';
import { xml2js } from 'xml-js';
import { DtoValidatorService } from 'src/dto-validator/dto-validator.service';
import { Sensor } from 'src/sensors/entities/sensor.entity';
import { SensorScrapingDtoToSensorAutomapper } from 'src/automapper-custom/sensor-scraping-dto-to-sensor.automapper';
import { SensorsService } from 'src/sensors/sensors.service';
import { ParkingArea } from 'src/parking-areas/entities/parking-area.entity';
import { ParkingAreasService } from 'src/parking-areas/parking-areas.service';
import { SensorScrapingDtoToParkingAreaAutomapper } from 'src/automapper-custom/sensor-scraping-dto-to-parking-area.automapper';

@Injectable()
export class SensorsScrapingService{
    constructor(
        private readonly httpService: HttpService,
        private readonly dtoValidatorService: DtoValidatorService,
        private readonly sensorService: SensorsService,
        private readonly parkingAreasService: ParkingAreasService,
        private readonly sensorScrapingDtoToSensorAutomapper: 
            SensorScrapingDtoToSensorAutomapper,
        private readonly sensorScrapingDtoToParkingAreaAutomapper: 
            SensorScrapingDtoToParkingAreaAutomapper
        ){}

    //@Cron('*/1 * * * *')
    async scrapeAndPersistSensors() {
        const sensorScrapingDto: SensorScrapingDto[] = await this.getSensorsScrapingDto();
        const sensors: Sensor[] = this.mapSensorScrapingDtoToSensor(sensorScrapingDto);
        const parkingAreas: ParkingArea[] = this.mapSensorScrapingDtoToParkingArea(sensorScrapingDto);

        const sensorsResponse = await this.saveSensorsToDatabase(sensors);
        //const parkingAreasResponse = await this.saveParkingAreasToDatabase(parkingAreas);

        return sensorsResponse;
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

    saveParkingAreasToDatabase(parkingAreas: ParkingArea[]){
        return this.parkingAreasService.createOrUpdateParkingAreas(parkingAreas);
    }

    mapSensorScrapingDtoToSensor(sensorScrapingDto: SensorScrapingDto[]): Sensor[]{
        return this.sensorScrapingDtoToSensorAutomapper
            .mapFromArray(sensorScrapingDto);
    }

    mapSensorScrapingDtoToParkingArea(sensorScrapingDto: SensorScrapingDto[]): ParkingArea[]{
        return this.sensorScrapingDtoToParkingAreaAutomapper
            .mapFromArray(sensorScrapingDto);
    }

    xmlToSensorObjectArray(xml){
       const result = xml2js(xml, {compact: false})

       const sensors = result.elements[0].elements
        .map(item => item.attributes)

       return sensors
    }
}
