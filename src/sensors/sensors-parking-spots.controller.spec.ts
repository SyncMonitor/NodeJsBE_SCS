import { createMock } from '@golevelup/ts-jest';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SensorsParkingSpotsController } from './sensors-parking-spots.controller';
import { SensorsService } from './sensors.service';

describe('SensorsParkingSpotsController', () => {
  let sensorsParkingSpotsController: SensorsParkingSpotsController;
  let sensorsService: SensorsService;
  let sensors;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorsParkingSpotsController],
      providers: [
        {
          provide: SensorsService,
          useValue: createMock<SensorsService>(),
        }
      ]
    }).compile();

    sensorsParkingSpotsController = 
        module.get<SensorsParkingSpotsController>(SensorsParkingSpotsController);
    sensorsService = 
        module.get<SensorsService>(SensorsService);
  });

  sensors = [
    {
        "id": "1",
        "name": "156A2A71",
        "battery": "3,7V",
        "charge": "3",
        "type": "ParkingSensor",
        "isActive": true,
        "lastSurvey": "2022-10-17T15:32:36.257Z"
    },
    {
        "id": "2",
        "name": "156A2C72",
        "battery": "3,7V",
        "charge": "3",
        "type": "ParkingSensor",
        "isActive": true,
        "lastSurvey": "2022-10-17T15:30:43.444Z"
    },
  ];

  describe('getAllSensorsByParkingSpotId', () => {
    it('should return the sensors if parking spot was found', async () => {
        jest.spyOn(sensorsService, 'getAllSensorsByParkingSpotId')
            .mockImplementation(() => Promise.resolve(sensors));

        const response = 
            sensorsParkingSpotsController.getAllSensorsByParkingSpotId('1');

        await expect(response).resolves.toEqual(sensors);
    });

    it('should thrown an HttpException if the parking sensor wasn\'t found', async () => {
        jest.spyOn(sensorsService, 'getAllSensorsByParkingSpotId')
            .mockImplementation(() => Promise.resolve(null));

        const response = 
            sensorsParkingSpotsController.getAllSensorsByParkingSpotId('1');

        await expect(response).rejects.toThrow(HttpException);
    });
  })
});
