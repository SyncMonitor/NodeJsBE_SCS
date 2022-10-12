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

@Injectable()
export class SensorsScrapingService{
    constructor(
        private readonly httpService: HttpService,
        private readonly dtoValidatorService: DtoValidatorService,
        private readonly sensorService: SensorsService,
        private readonly sensorScrapingDtoToSensorAutomapper: 
            SensorScrapingDtoToSensorAutomapper
        ){}

    //@Cron('*/1 * * * *')
    async scrapeAndPersistSensors() {
        const sensorScrapingDto: SensorScrapingDto[] = await this.getSensorsScrapingDto();
        const sensors: Sensor[] = this.mapSensorScrapingDtoToSensor(sensorScrapingDto);

        const response = await this.saveSensorsToDatabase(sensors);

        return response;
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

    mapSensorScrapingDtoToSensor(sensorScrapingDto: SensorScrapingDto[]): Sensor[]{
        return this.sensorScrapingDtoToSensorAutomapper
            .mapFromArray(sensorScrapingDto);
    }

    xmlToSensorObjectArray(xml){
       const result = xml2js(xml, {compact: false})

       const sensors = result.elements[0].elements
        .map(item => item.attributes)

       return sensors
    }
}
