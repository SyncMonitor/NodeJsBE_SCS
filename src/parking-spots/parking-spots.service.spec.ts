import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'src/exceptions/not-found.exception';
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
  })
});
