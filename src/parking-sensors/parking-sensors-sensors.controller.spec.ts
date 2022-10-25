import { createMock } from '@golevelup/ts-jest';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SensorsService } from 'src/sensors/sensors.service';
import { ParkingSensorsSensorsController } from './parking-sensors-sensors.controller';
import { ParkingSensorsService } from './parking-sensors.service';

describe('ParkingSensorsController', () => {
  let parkingSensorsSensorsController: ParkingSensorsSensorsController;
  let parkingSensorsService: ParkingSensorsService;
  let sensorsService: SensorsService;
  let sensor;
  let parkingSensors;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSensorsSensorsController],
      providers: [
        {
            provide: ParkingSensorsService,
            useValue: createMock<ParkingSensorsService>(),
        },
        {
            provide: SensorsService,
            useValue: createMock<SensorsService>(),
        }
      ]
    }).compile();

    parkingSensorsSensorsController = 
        module.get<ParkingSensorsSensorsController>(ParkingSensorsSensorsController);
    parkingSensorsService = 
        module.get<ParkingSensorsService>(ParkingSensorsService);
    sensorsService =
        module.get<SensorsService>(SensorsService);
  });

    sensor = {
        'id': '1',
        'name': '156A2C71',
        'battery': '3,7V',
        'charge': '3',
        'type': 'ParkingSensor',
        'isActive': true,
        'lastSurvey': Date(),
    }

    parkingSensors = [
            {
            'id': '2823',
            'address': 'Padova Galleria Spagna',
            'latitude': '45.389040',
            'longitude': '11.928577',
            'value': false,
            'timestamp': '2022-10-17T16:05:22.101Z',
            'sensor': sensor,
        }
    ]

  describe('getAllParkingSensorsBySensorId', () => {
    it('should return a the parking sensor if the sensor was found', async () => {
        jest.spyOn(sensorsService, 'getSensorById')
            .mockImplementation(() => Promise.resolve(sensor));
        jest.spyOn(parkingSensorsService, 'getAllParkingSensorsBySensorId')
            .mockImplementation(() => Promise.resolve(parkingSensors));

        const response = 
            parkingSensorsSensorsController.getAllParkingSensorsBySensorId('1');

        await expect(response).resolves.toEqual(parkingSensors);
    });

    it('should throw an HtppException if the sensor wasn\'t found', async () => {
        jest.spyOn(sensorsService, 'getSensorById')
            .mockImplementation(() => Promise.resolve(null));

        const response = 
            parkingSensorsSensorsController.getAllParkingSensorsBySensorId('1');

        await expect(response).rejects.toThrow(HttpException);
    });
  })
});