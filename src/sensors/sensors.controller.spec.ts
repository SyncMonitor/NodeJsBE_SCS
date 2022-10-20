import { createMock } from '@golevelup/ts-jest';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Sensor } from './entities/sensor.entity';
import { SensorsController } from './sensors.controller';
import { SensorsService } from './sensors.service';

describe('SensorsController', () => {
  let sensorsController: SensorsController;
  let sensorsService: SensorsService;
  let sensor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorsController],
      providers: [
        {
          provide: SensorsService,
          useValue: createMock<SensorsService>(),
        }
      ]
    }).compile();

    sensorsController = module.get<SensorsController>(SensorsController);
    sensorsService = module.get<SensorsService>(SensorsService);
  });

  sensor = {
      'id': '1',
      'name': '156A2B77',
      'battery': '3,7V',
      'charge': '3',
      'type': 'ParkingSensor',
      'isActive': true,
      'lastSurvey': '2022-10-20T11:57:00.487Z'
  }

  describe('getSensorById', () => {
    it('should return the sensor if found', async () => {
      jest.spyOn(sensorsService, 'getSensorById')
        .mockImplementation(() => Promise.resolve(sensor));

      const response = sensorsController.getSensorById('1');

      await expect(response).resolves.toEqual(sensor);
    })

    it('should throw an HttpException if it didn\' find the sensor', async () => {
      jest.spyOn(sensorsService, 'getSensorById')
        .mockImplementation(() => Promise.resolve(null));

      const response = sensorsController.getSensorById('99');

      await expect(response).rejects.toThrow(HttpException);
    })
  })
});
