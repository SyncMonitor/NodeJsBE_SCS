import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { SensorScrapingDto } from './dto/sensor-scraping.dto';
import { SensorsScrapingService } from './sensors-scraping.service'
import { createMock } from '@golevelup/ts-jest';
import { of } from 'rxjs';
import { DtoValidatorService } from 'src/dto-validator/dto-validator.service';
import { SensorScrapingDtoToSensorAutomapper } from 'src/automapper-custom/sensor-scraping-dto-to-sensor.automapper';
import { SensorsService } from 'src/sensors/sensors.service';
import { SensorScrapingDtoToParkingSensorAutomapper } from 'src/automapper-custom/sensor-scraping-dto-to-parking-sensor.automapper';
import { ParkingSensorsService } from 'src/parking-sensors/parking-sensors.service';
import { MaintainerRegistry } from 'src/maintainers-registry/entities/maintainer-registry.entity';
import { SensorMaintenance } from 'src/sensors-maintenance/entities/sensor-maintenance.entity';
import { SensorsMaintenanceService } from 'src/sensors-maintenance/sensors-maintenance.service';

describe('SensorsScraping', () =>{
    let sensorsScrapingService: SensorsScrapingService;
    let httpService: HttpService;
    let sensorScrapingDto: SensorScrapingDto;
    let dtoValidatorService: DtoValidatorService;
    let sensorsService: SensorsService;
    let parkingSensorsService: ParkingSensorsService;
    let sensorsMaintenanceService: SensorsMaintenanceService;
    let sensorScrapingDtoToSensorAutomapper: 
        SensorScrapingDtoToSensorAutomapper;
    let sensorScrapingDtoToParkingSensorAutomapper: 
        SensorScrapingDtoToParkingSensorAutomapper;
    let responseDataScraping;
    
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                SensorsScrapingService,
                {
                    provide: HttpService,
                    useValue: createMock<HttpService>()
                },
                {
                    provide: DtoValidatorService,
                    useValue: createMock<DtoValidatorService>()
                },
                {
                    provide: SensorsService,
                    useValue: createMock<SensorsService>()
                },
                {
                    provide: ParkingSensorsService,
                    useValue: createMock<ParkingSensorsService>()
                },
                {
                    provide: SensorsMaintenanceService,
                    useValue: createMock<SensorsMaintenanceService>()
                },
                {
                    provide: SensorScrapingDtoToSensorAutomapper,
                    useValue: createMock<SensorScrapingDtoToSensorAutomapper>()
                },
                {
                    provide: SensorScrapingDtoToParkingSensorAutomapper,
                    useValue: createMock<SensorScrapingDtoToParkingSensorAutomapper>()
                },
            ],
        }).compile();

        sensorsScrapingService = moduleRef.get<SensorsScrapingService>(SensorsScrapingService);
        httpService = moduleRef.get<HttpService>(HttpService);
        dtoValidatorService = moduleRef.get<DtoValidatorService>(DtoValidatorService);
        sensorsService = moduleRef.get<SensorsService>(SensorsService);
        parkingSensorsService = moduleRef.get<ParkingSensorsService>(ParkingSensorsService);
        sensorsMaintenanceService = moduleRef.get<SensorsMaintenanceService>(SensorsMaintenanceService);
        sensorScrapingDtoToSensorAutomapper = moduleRef.get<SensorScrapingDtoToSensorAutomapper>
            (SensorScrapingDtoToSensorAutomapper);
        sensorScrapingDtoToParkingSensorAutomapper = moduleRef.get<SensorScrapingDtoToParkingSensorAutomapper>
            (SensorScrapingDtoToParkingSensorAutomapper);
        sensorScrapingDto = {
            id: '1',
            name: '156A2C71',
            address: 'Padova Galleria Spagna',
            lat: '45.389040',
            lng: '11.928577',
            state: false,
            battery: '3,7V',
            active: true,
        }
        responseDataScraping = {
            data: [
                sensorScrapingDto
            ],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        }

    })

    describe('getSensorScrapingDto', () => {
        // //TODO: figure out if this method that creates an istance of another class is a good practice 
        // it('return object should be a sensor dto', async () => {
        //     const dtoValidatorServiceReal = new DtoValidatorService();
        //     jest.spyOn(httpService, 'get').mockImplementation(() => of(responseDataScraping));
        //     jest.spyOn(sensorsScrapingService, 'xmlToSensorObjectArray').mockImplementation(() => responseDataScraping.data);
        //     jest.spyOn(dtoValidatorService, 'checkDtoConsistencyArray').mockImplementation(() => true);

        //     const response = await sensorsScrapingService.getSensorsScrapingDto();
            
        //     expect(dtoValidatorServiceReal.checkDtoConsistency(new SensorScrapingDto(),response[0])).toBeTruthy();
        // })

        it('should throw exception if sensors scraped are not consistent with sensor dto', async () => {
            let response = responseDataScraping;
            delete response.data[0].battery;
            response.data[0].batteryOld = '3,7V'; // adding the inconsistent field

            jest.spyOn(httpService, 'get').mockImplementation(() => of(responseDataScraping));
            jest.spyOn(sensorsScrapingService, 'xmlToSensorObjectArray').mockImplementation(() => response.data);
            jest.spyOn(dtoValidatorService, 'checkDtoConsistencyArray').mockImplementation(() => false);

            await expect(sensorsScrapingService.getSensorsScrapingDto()).rejects.toThrow(Error)
        })
    })

    it('should not throw exception if sensors scraped are consistent with sensor dto', async () => {

        jest.spyOn(httpService, 'get').mockImplementation(() => of(responseDataScraping));
        jest.spyOn(sensorsScrapingService, 'xmlToSensorObjectArray').mockImplementation(() => responseDataScraping.data);
        jest.spyOn(dtoValidatorService, 'checkDtoConsistencyArray').mockImplementation(() => true);


        await expect(sensorsScrapingService.getSensorsScrapingDto()).resolves.toEqual(responseDataScraping.data)
    })

    describe('xmlToSensorObjectArray', () => {
        it('converted xml should be an object', () => {
            const xml = `
            <?xml version='1.0'?>
            <markers>
            <marker id='1' name='156A2C71' address='Padova Galleria Spagna' lat='45.389040' lng='11.928577' state='0' battery='3,7V' active='1'/>
            <marker id='2' name='156A2A71' address='Padova Galleria Spagna' lat='45.389029' lng='11.928598' state='1' battery='3,7V' active='1'/>
            </markers>`
            const obj = [
                {
                    id: '1',
                    name: '156A2C71',
                    address: 'Padova Galleria Spagna',
                    lat: '45.389040',
                    lng: '11.928577',
                    state: '0',
                    battery: '3,7V',
                    active: '1',
                  },
                  {
                    id: '2',
                    name: '156A2A71',
                    address: 'Padova Galleria Spagna',
                    lat: '45.389029',
                    lng: '11.928598',
                    state: '1',
                    battery: '3,7V',
                    active: '1',
                  },
            ]

            const objConverted = sensorsScrapingService.xmlToSensorObjectArray(xml);

            expect(objConverted).toEqual(obj)
        })
    })

})