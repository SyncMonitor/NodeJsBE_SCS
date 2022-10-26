import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'src/exceptions/not-found.exception';
import { UpdateError } from 'src/exceptions/update.exception';
import { ParkingAreasRepository } from './parking-areas.repository';
import { ParkingAreasService } from './parking-areas.service';

describe('ParkingAreasService', () => {
  let parkingAreasService: ParkingAreasService;
  let parkingAreasRepository: ParkingAreasRepository;
  let parkingArea;
  let recordUpdatedResponse;
  let recordNotUpdatedResponse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingAreasService,
        {
            provide: ParkingAreasRepository,
            useValue: createMock<ParkingAreasRepository>(),
        }
      ]
    }).compile();

    parkingAreasService = 
      module.get<ParkingAreasService>(ParkingAreasService);
    parkingAreasRepository = 
      module.get<ParkingAreasRepository>(ParkingAreasRepository);
  });

  parkingArea = {
    'id': '1',
    'address': 'Via Monza',
    'latitude': '11.777779',
    'longitude': '12.666666'
  };

  recordUpdatedResponse = { generatedMaps: [], raw: [], affected: 1 };
  recordNotUpdatedResponse = { generatedMaps: [], raw: [], affected: 0 };

  describe('editParkingAreaById', () => {
    it('should return the parking area edited if it was edited', async () => {
      jest.spyOn(parkingAreasService, 'getParkingAreaById')
        .mockImplementation(() => Promise.resolve(parkingArea));
      jest.spyOn(parkingAreasRepository, 'update')
          .mockImplementation(() => Promise.resolve(recordUpdatedResponse));

      const response = 
        parkingAreasService.editParkingAreaById('1', parkingArea);

      await expect(response).resolves.toEqual(parkingArea);
    });

    it('should throw a NotFoundError if the parking area id wasn\'t found', async () => {
      jest.spyOn(parkingAreasService, 'getParkingAreaById')
        .mockImplementation(() => Promise.resolve(null));

      const response = 
        parkingAreasService.editParkingAreaById('1', parkingArea);

      await expect(response).rejects.toThrow(NotFoundError);
    });

    it('should throw an UpdateError if it couldn\'t update the record', async() => {
      jest.spyOn(parkingAreasService, 'getParkingAreaById')
        .mockImplementation(() => Promise.resolve(parkingArea));
      jest.spyOn(parkingAreasRepository, 'update')
        .mockImplementation(() => Promise.resolve(recordNotUpdatedResponse));

      const response =
        parkingAreasService.editParkingAreaById('1', parkingArea);

      await expect(response).rejects.toThrow(UpdateError);
    })
  });
});