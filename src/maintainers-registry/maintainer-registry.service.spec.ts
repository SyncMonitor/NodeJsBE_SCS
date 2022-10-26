import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'src/exceptions/not-found.exception';
import { UpdateError } from 'src/exceptions/update.exception';
import { MaintainersRegistryRepository } from './maintainers-registry.repository';
import { MaintainersRegistryService } from './maintainers-registry.service';

describe('MaintainersRegistryService', () => {
  let maintainersRegistryService: MaintainersRegistryService;
  let maintainersRegistryRepository: MaintainersRegistryRepository;
  let maintainerRegistry;
  let recordUpdatedResponse;
  let recordNotUpdatedResponse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintainersRegistryService],
      providers: [
        {
          provide: MaintainersRegistryRepository,
          useValue: createMock<MaintainersRegistryRepository>()
        }
      ]
    }).compile();

    maintainersRegistryService = 
      module.get<MaintainersRegistryService>(MaintainersRegistryService);
      maintainersRegistryRepository = 
      module.get<MaintainersRegistryRepository>(MaintainersRegistryRepository);
  });

  maintainerRegistry = {
        'id': '1',
        'name': 'Mario',
        'surname': 'Rossi',
        'company': 'Sensor repair snc',
        'phone': '3313333333',
        'email': 'mario@sensorrepairing.it'
    }

    recordUpdatedResponse = { generatedMaps: [], raw: [], affected: 1 };
    recordNotUpdatedResponse = { generatedMaps: [], raw: [], affected: 0 };

  describe('editMaintainerById', () => {
    it('should return the maintainer registry updated if it was updated', async () => {
        jest.spyOn(maintainersRegistryService, 'getMaintainerById')
            .mockImplementation(() => Promise.resolve(maintainerRegistry));
        jest.spyOn(maintainersRegistryRepository, 'update')
            .mockImplementation(() => Promise.resolve(recordUpdatedResponse));

        const response = 
            maintainersRegistryService.editMaintainerById('1', maintainerRegistry);

        await expect(response).resolves.toEqual(maintainerRegistry);
    });

    it('should throw a NotFoundError if the maintainer registry id wasn\'t found', async () => {
        jest.spyOn(maintainersRegistryService, 'getMaintainerById')
            .mockImplementation(() => Promise.resolve(null));

        const response = 
            maintainersRegistryService.editMaintainerById('1', maintainerRegistry);

        await expect(response).rejects.toThrow(NotFoundError);
    });

    it('should throw an UpdateError if it couldn\'t update the record', async () => {
        jest.spyOn(maintainersRegistryService, 'getMaintainerById')
            .mockImplementation(() => Promise.resolve(maintainerRegistry));
        jest.spyOn(maintainersRegistryRepository, 'update')
            .mockImplementation(() => Promise.resolve(recordNotUpdatedResponse));

        const response = 
            maintainersRegistryService.editMaintainerById('1', maintainerRegistry);

        await expect(response).rejects.toThrow(UpdateError);
    });
  });
});
