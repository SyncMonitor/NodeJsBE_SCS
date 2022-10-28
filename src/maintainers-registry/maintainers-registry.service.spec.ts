import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteError } from 'src/exceptions/delete.exception';
import { InsertError } from 'src/exceptions/insert.exception';
import { NotFoundError } from 'src/exceptions/not-found.exception';
import { UpdateError } from 'src/exceptions/update.exception';
import { MaintainersRegistryRepository } from './maintainers-registry.repository';
import { MaintainersRegistryService } from './maintainers-registry.service';

describe('MaintainersRegistryService', () => {
  let maintainersRegistryService: MaintainersRegistryService;
  let maintainersRegistryRepository: MaintainersRegistryRepository;
  let maintainerRegistry;
  let conflictDatabaseError;
  let recordInsertedResponse;
  let recordNotInsertedResponse;
  let recordUpdatedResponse;
  let recordNotUpdatedResponse;
  let recordDeletedResponse;
  let recordNotDeletedResponse;

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
  };

  conflictDatabaseError = {
    message: 'conflict database error',
    code: 23505,
  };

  recordInsertedResponse = {
    identifiers: [ { id: '1' } ],
    generatedMaps: [ { id: '1' } ],
    raw: [ { id: '1' } ],
  };

  recordNotInsertedResponse = {
    identifiers: [ ],
    generatedMaps: [ ],
    raw: [ ],
  };

  recordUpdatedResponse = { generatedMaps: [], raw: [], affected: 1 };
  recordNotUpdatedResponse = { generatedMaps: [], raw: [], affected: 0 };

  recordDeletedResponse = { raw: [], affected: 1 };
  recordNotDeletedResponse = { raw: [], affected: 0 };

  describe('getMaintainerById', () => {
    it('should return the maintainer if found', async () => {
      jest.spyOn(maintainersRegistryRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(maintainerRegistry));

      const response = maintainersRegistryService.getMaintainerById('1');

      await expect(response).resolves.toEqual(maintainerRegistry);
    });

    it('should thrown a NotFoundError if the maintainer was not found', async () => {
      jest.spyOn(maintainersRegistryRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      const response = maintainersRegistryService.getMaintainerById('1');

      await expect(response).rejects.toThrow(NotFoundError);
    });
  });

  describe('createMaintainer', () => {
    it('should return the maintainer created if a maintainer was created', async () => {
      jest.spyOn(maintainersRegistryRepository, 'insert')
        .mockImplementation(() => Promise.resolve(recordInsertedResponse));
      jest.spyOn(maintainersRegistryService, 'getMaintainerById')
        .mockImplementation(() => Promise.resolve(maintainerRegistry));

      const response = 
        maintainersRegistryService.createMaintainer(maintainerRegistry);
      
      await expect(response).resolves.toEqual(maintainerRegistry);
    })

    it('should thrown an InsertError if it couldn\'t create the record', async () => {
      jest.spyOn(maintainersRegistryRepository, 'insert')
        .mockImplementation(() => Promise.resolve(recordNotInsertedResponse));

      const response = 
        maintainersRegistryService.createMaintainer(maintainerRegistry);
      
      await expect(response).rejects.toThrow(InsertError);
    })
  })

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

  describe('deleteMaintainerById', () => {
    it('should return undefined value if the maintainer registry was deleted', async () => {
      jest.spyOn(maintainersRegistryService, 'getMaintainerById')
        .mockImplementation(() => Promise.resolve(maintainerRegistry));
      jest.spyOn(maintainersRegistryRepository, 'delete')
      .mockImplementation(() => Promise.resolve(recordDeletedResponse));

      const response = 
        maintainersRegistryService.deleteMaintainerById('1');

      await expect(response).resolves.toBeUndefined();
    });

    it('should throw a DeleteError if it couldn\'t delete the record', async () => {
      jest.spyOn(maintainersRegistryService, 'getMaintainerById')
        .mockImplementation(() => Promise.resolve(maintainerRegistry));
      jest.spyOn(maintainersRegistryRepository, 'delete')
        .mockImplementation(() => Promise.resolve(recordNotDeletedResponse));

      const response = 
        maintainersRegistryService.deleteMaintainerById('1');

      await expect(response).rejects.toThrow(DeleteError);
    });
  });
});
