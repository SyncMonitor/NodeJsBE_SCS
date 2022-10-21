import { createMock } from '@golevelup/ts-jest';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'src/exceptions/not-found.exception';
import { ParkingAreasService } from 'src/parking-areas/parking-areas.service';
import { ParkingSpotsParkingAreasController } from './parking-spots-parking-areas.controller';
import { ParkingSpotsService } from './parking-spots.service';

describe('ParkingSpotsParkingAreasController', () => {
  let parkingSpotsParkingAreasController: ParkingSpotsParkingAreasController;
  let parkingSpotsService: ParkingSpotsService;
  let parkingAreasService: ParkingAreasService;
  let parkingArea;
  let parkingSpots;
  let conflictDatabaseError;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSpotsParkingAreasController],
      providers: [
        {
          provide: ParkingSpotsService,
          useValue: createMock<ParkingSpotsService>(),
        },
        {
          provide: ParkingAreasService,
          useValue: createMock<ParkingAreasService>(),
        }
      ]
    }).compile();

    parkingSpotsParkingAreasController = 
      module.get<ParkingSpotsParkingAreasController>(ParkingSpotsParkingAreasController);
    parkingSpotsService = module.get<ParkingSpotsService>(ParkingSpotsService);
    parkingAreasService = module.get<ParkingAreasService>(ParkingAreasService);
  });

  parkingArea = {
    id: '1',
    address: 'Via Forcellini',
    latitude: '47.390018',
    longitude: '47.392978',
  }

  parkingSpots = [
      {
          'id': '1',
          'latitude': '13.855173',
          'longitude': '13.455173',
          'parkingArea': parkingArea
      },
      {
          'id': '2',
          'latitude': '14.855173',
          'longitude': '15.855173',
          'parkingArea': parkingArea
      }
  ]

  conflictDatabaseError = {
    message: 'conflict database error',
    code: 23505,
  }

  describe('getAllParkingSpotsByParkingAreaId', () => {
    it('should return the parking spots if the parking area was found', async () => {
      jest.spyOn(parkingSpotsService, 'getAllParkingSpotsByParkingAreaId')
        .mockImplementation(() => parkingSpots);

      const response = 
        parkingSpotsParkingAreasController.getAllParkingSpotsByParkingAreaId('1');

      await expect(response).resolves.toEqual(parkingSpots);
    })

    it('should throw an HttpException if the parking area was not found', async () => {
      jest.spyOn(parkingSpotsService, 'getAllParkingSpotsByParkingAreaId')
        .mockImplementation(() => Promise.resolve(null));

      const response = 
        parkingSpotsParkingAreasController.getAllParkingSpotsByParkingAreaId('1');

      await expect(response).rejects.toThrow(HttpException);
    })
  })

describe('createParkingSpotByParkingAreaId', () => {
  it('should return the parking spot created if one was created', async () => {
    jest.spyOn(parkingSpotsService, 'createParkingSpotByParkingAreaId')
      .mockImplementation(() => Promise.resolve(parkingSpots[0]));

    const response = 
      parkingSpotsParkingAreasController.createParkingSpotByParkingAreaId('1', parkingSpots[0]);

    await expect(response).resolves.toEqual(parkingSpots[0]);
  })

  it('should throw an HttpException if the parking spot wasn\'t created with NOT_FOUND status code if parking area wasn\'t found', async () => {
    jest.spyOn(parkingSpotsService, 'createParkingSpotByParkingAreaId')
      .mockImplementation(() => Promise.reject(new NotFoundError('parking area id not found')));

    const response = 
      parkingSpotsParkingAreasController.createParkingSpotByParkingAreaId('1', parkingSpots[0]);

    await expect(response).rejects.toThrow(HttpException);
    try{
      await response;
    }catch(error){ 
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  })

  it('should throw an HttpException if the parking spot wasn\'t created with CONFLICT status code if parking spot had a conflict with other record', async () => {
    jest.spyOn(parkingSpotsService, 'createParkingSpotByParkingAreaId')
      .mockImplementation(() => Promise.reject(conflictDatabaseError));

    const response = 
      parkingSpotsParkingAreasController.createParkingSpotByParkingAreaId('1', parkingSpots[0]);

    await expect(response).rejects.toThrow(HttpException);
    try{
      await response;
    }catch(error){ 
      expect(error.status).toBe(HttpStatus.CONFLICT);
    }
  })
})
});
