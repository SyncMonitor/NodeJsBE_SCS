import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteError } from 'src/exceptions/delete.exception';
import { NotFoundError } from 'src/exceptions/not-found.exception';
import { UpdateError } from 'src/exceptions/update.exception';
import { ParkingAreasService } from 'src/parking-areas/parking-areas.service';
import { ParkingSpotsRepository } from './parking-spots.repository';
import { ParkingSpotsService } from './parking-spots.service';

describe('ParkingSpotsService', () => {
  let parkingSpotsService: ParkingSpotsService;
  let parkingSpotsRepository: ParkingSpotsRepository;
  let parkingAreasService: ParkingAreasService;
  let parkingArea;
  let parkingSpot;
  let insertParkingSpotResponse;
  let recordUpdatedResponse;
  let recordNotUpdatedResponse;
  let recordDeletedResponse;
  let recordNotDeletedResponse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingSpotsService,
        {
          provide: ParkingSpotsRepository,
          useValue: createMock<ParkingSpotsRepository>(),
        },
        {
          provide: ParkingAreasService,
          useValue: createMock<ParkingAreasService>(),
        }
      ],
    }).compile();

    parkingSpotsService = module.get<ParkingSpotsService>(ParkingSpotsService);
    parkingSpotsRepository = module.get<ParkingSpotsRepository>(ParkingSpotsRepository);
    parkingAreasService = module.get<ParkingAreasService>(ParkingAreasService);
  });

  parkingArea = {
    id: '1',
    address: 'Via Forcellini',
    latitude: '47.390018',
    longitude: '47.392978',
  }

  parkingSpot = {
      'id': '1',
      'latitude': '13.855173',
      'longitude': '13.455173',
      'parkingArea': parkingArea
  }

  insertParkingSpotResponse = {
    identifiers: [ { id: '10' } ],
    generatedMaps: [ { id: '10' } ],
    raw: [ { id: '10' } ]
  }

  recordUpdatedResponse = { generatedMaps: [], raw: [], affected: 1 };
  recordNotUpdatedResponse = { generatedMaps: [], raw: [], affected: 0 };

  recordDeletedResponse = { raw: [], affected: 1 };
  recordNotDeletedResponse = { raw: [], affected: 0 };

  describe('createParkingSpotByParkingAreaId', () => {
    it('should return the parking spot created if one was created', async () => {
      jest.spyOn(parkingAreasService, 'getParkingAreaById')
        .mockImplementation(() => Promise.resolve(parkingArea));
      jest.spyOn(parkingSpotsRepository, 'insert')
        .mockImplementation(() => Promise.resolve(insertParkingSpotResponse));
      jest.spyOn(parkingSpotsService, 'getParkingSpotById')
        .mockImplementation(() => Promise.resolve(parkingSpot));

      const response = 
        parkingSpotsService.createParkingSpotByParkingAreaId('1', parkingSpot);

      await expect(response).resolves.toEqual(parkingSpot);
    })

    it('should throw an error if the parking area was not found', async () => {
      jest.spyOn(parkingAreasService, 'getParkingAreaById')
        .mockImplementation(() => Promise.resolve(null));

      const response = 
        parkingSpotsService.createParkingSpotByParkingAreaId('1', parkingSpot);

      await expect(response).rejects.toThrow(NotFoundError);
    })
  });

  describe('editParkingSpotById', () => {
    it('should return the parking spot edited if it was edited', async () => {
      jest.spyOn(parkingSpotsService, 'getParkingSpotById')
        .mockImplementation(() => Promise.resolve(parkingSpot));
      jest.spyOn(parkingSpotsRepository, 'update')
        .mockImplementation(() => Promise.resolve(recordUpdatedResponse));

      const response = 
        parkingSpotsService.editParkingSpotById('1', parkingSpot);

      await expect(response).resolves.toEqual(parkingSpot);
    });

    it('should throw a NotFoundError if the parking spot id wasn\'t found', async () => {
      jest.spyOn(parkingSpotsService, 'getParkingSpotById')
        .mockImplementation(() => Promise.resolve(null));

      const response = 
        parkingSpotsService.editParkingSpotById('1', parkingSpot);

      await expect(response).rejects.toThrow(NotFoundError);
    });

    it('should throw an UpdateError if it couldn\'t update the record', async () => {
      jest.spyOn(parkingSpotsService, 'getParkingSpotById')
        .mockImplementation(() => Promise.resolve(parkingSpot));
      jest.spyOn(parkingSpotsRepository, 'update')
        .mockImplementation(() => Promise.resolve(recordNotUpdatedResponse));

      const response = 
        parkingSpotsService.editParkingSpotById('1', parkingSpot);

      await expect(response).rejects.toThrow(UpdateError);
    });
  });

  describe('deleteParkingSpotById', () => {
    it('should return undefined value if the parking spot was deleted', async () => {
      jest.spyOn(parkingSpotsService, 'getParkingSpotById')
        .mockImplementation(() => Promise.resolve(parkingSpot));
      jest.spyOn(parkingSpotsRepository, 'delete')
        .mockImplementation(() => Promise.resolve(recordDeletedResponse));

      const response = 
        parkingSpotsService.deleteParkingSpotById('1');

      await expect(response).resolves.toBeUndefined()
    });

    it('should throw a NotFoundError if the parking spot wasn\'t found', async () => {
      jest.spyOn(parkingSpotsService, 'getParkingSpotById')
        .mockImplementation(() => Promise.resolve(null));

      const response = 
        parkingSpotsService.deleteParkingSpotById('1');

      await expect(response).rejects.toThrow(NotFoundError);
    });

    it('should throw a DeleteError if it couldn\'t delete the record', async () => {
      jest.spyOn(parkingSpotsService, 'getParkingSpotById')
        .mockImplementation(() => Promise.resolve(parkingSpot));
      jest.spyOn(parkingSpotsRepository, 'delete')
        .mockImplementation(() => Promise.resolve(recordNotDeletedResponse));

      const response = 
        parkingSpotsService.deleteParkingSpotById('1');

      await expect(response).rejects.toThrow(DeleteError);
    });
  })
});
