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
import { ParkingSpotsService } from 'src/parking-spots/parking-spots.service';
import { SensorScrapingDtoToParkingSpotAutomapper } from 'src/automapper-custom/sensor-scraping-dto-to-parking-spot.automapper';
import { ParkingSpot } from 'src/parking-spots/entities/parking-spot.entity';
import { ParkingSensor } from 'src/measurements/entities/parking-sensor.entity';

@Injectable()
export class SensorsScrapingService{
    constructor(
        private readonly httpService: HttpService,
        private readonly dtoValidatorService: DtoValidatorService,
        private readonly sensorService: SensorsService,
        private readonly parkingSpotsService: ParkingSpotsService,
        private readonly sensorScrapingDtoToSensorAutomapper: 
            SensorScrapingDtoToSensorAutomapper,
        private readonly sensorScrapingDtoToParkingSpotAutomapper: 
            SensorScrapingDtoToParkingSpotAutomapper,
        ){}

    //@Cron('*/1 * * * *')
    async scrapeAndPersistSensors() {
        
        const sensorScrapingDto: SensorScrapingDto[] = await this.getSensorsScrapingDto();
        const sensors: Sensor[] = this.mapSensorScrapingDtoToSensor(sensorScrapingDto);
        const parkingSpots: ParkingSpot[] = this.mapSensorScrapingDtoToParkingSpot(sensorScrapingDto);

        const sensorsResponse = await this.saveSensorsToDatabase(sensors);
        //const parkingSpotsResponse = await this.saveParkingSpotsToDatabase(parkingSpots);

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

    saveParkingSpotsToDatabase(parkingSpots: ParkingSpot[]){
        return this.parkingSpotsService.createOrUpdateParkingSpots(parkingSpots);
    }

    mapSensorScrapingDtoToSensor(sensorScrapingDto: SensorScrapingDto[]): Sensor[]{
        return this.sensorScrapingDtoToSensorAutomapper
            .mapFromArray(sensorScrapingDto);
    }

    mapSensorScrapingDtoToParkingSpot(sensorScrapingDto: SensorScrapingDto[]): ParkingSpot[]{
        return this.sensorScrapingDtoToParkingSpotAutomapper
            .mapFromArray(sensorScrapingDto);
    }

    xmlToSensorObjectArray(xml){
       const result = xml2js(xml, {compact: false})

       const sensors = result.elements[0].elements
        .map(item => item.attributes)

       return sensors
    }
}
