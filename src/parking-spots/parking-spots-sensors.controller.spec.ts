import { createMock } from '@golevelup/ts-jest';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SensorsService } from 'src/sensors/sensors.service';
import { ParkingSpotsSensorsController } from './parking-spots-sensors.controller';
import { ParkingSpotsService } from './parking-spots.service';

describe('ParkingSpotsSensorsController', () => {
  let parkingSpotsSensorsController: ParkingSpotsSensorsController;
  let parkingSpotsService: ParkingSpotsService;
  let sensorsService: SensorsService;
  let sensor;
  let parkingSpots;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSpotsSensorsController],
      providers: [
        {
          provide: ParkingSpotsService,
          useValue: createMock<ParkingSpotsService>(),
        },
        {
          provide: SensorsService,
          useValue: createMock<SensorsService>(),
        },
      ]
    }).compile();

    parkingSpotsSensorsController = 
      module.get<ParkingSpotsSensorsController>(ParkingSpotsSensorsController);
    parkingSpotsService = 
      module.get<ParkingSpotsService>(ParkingSpotsService);
    sensorsService = 
      module.get<SensorsService>(SensorsService);
  });

  sensor = {
    id: '1',
    name: '156A2B71',
    battery: '3,7V',
    charge: '3',
    type: 'ParkingSensor',
    isActive: true,
    lastSurvey: Date(),
  }

  parkingSpots = [
    {
        "id": "2",
        "name": "156A2A71",
        "battery": "3,7V",
        "charge": "3",
        "type": "ParkingSensor",
        "isActive": true,
        "lastSurvey": "2022-10-17T15:32:36.257Z"
    },
    {
        "id": "4",
        "name": "156A2C72",
        "battery": "3,7V",
        "charge": "3",
        "type": "ParkingSensor",
        "isActive": true,
        "lastSurvey": "2022-10-17T15:30:43.444Z"
    }
  ]

  describe('getAllParkingSpotsBySensorId', () => {
    it('should return the parking spots if the sensor was found', async () => {
      jest.spyOn(sensorsService, 'getSensorById')
        .mockImplementation(() => Promise.resolve(sensor));
      jest.spyOn(parkingSpotsService, 'getAllParkingSpotsBySensorId')
        .mockImplementation(() => Promise.resolve(parkingSpots));

      const response = 
        parkingSpotsSensorsController.getAllParkingSpotsBySensorId('1');
      
      await expect(response).resolves.toEqual(parkingSpots);
    })

    it('should thrown an HttpException if the sensor wasn\'t found', async () => {
      jest.spyOn(sensorsService, 'getSensorById')
        .mockImplementation(() => Promise.resolve(null));

      const response = 
        parkingSpotsSensorsController.getAllParkingSpotsBySensorId('1');
      
      await expect(response).rejects.toThrow(HttpException);
    })
  })
});
