import { createMock } from '@golevelup/ts-jest';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MaintainerRegistry } from './entities/maintainer-registry.entity';
import { MaintainersRegistryController } from './maintainers-registry.controller';
import { MaintainersRegistryService } from './maintainers-registry.service';

describe('MaintainersRegistryController', () => {
  let maintainersRegistryController: MaintainersRegistryController;
  let maintainersRegistryService: MaintainersRegistryService;
  let maintainer;
  let conflictDatabaseError;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintainersRegistryController],
      providers: [
        {
          provide: MaintainersRegistryService,
          useValue: createMock<MaintainersRegistryService>()
        }
      ]
    }).compile();

    maintainersRegistryController = 
      module.get<MaintainersRegistryController>(MaintainersRegistryController);
    maintainersRegistryService = 
      module.get<MaintainersRegistryService>(MaintainersRegistryService);
  });

  maintainer = {
      'id': '1',
      'name': 'Mario',
      'surname': 'Rossi',
      'company': 'Sensors repairing snc',
      'phone': '3319999999',
      'email': 'mario@sensorsrepairing.com'
  }

  conflictDatabaseError = {
    message: 'conflict database error',
    code: 23505,
  }

  describe('getMaintainerById', () => {
    it('should return the maintainer if found', async () => {
      jest.spyOn(maintainersRegistryService, 'getMaintainerById')
        .mockImplementation(() => Promise.resolve(maintainer));

      const response = maintainersRegistryController.getMaintainerById('1');

      await expect(response).resolves.toEqual(maintainer);
    })

    it('should thrown an HttpException if the maintainer was not found', async () => {
      jest.spyOn(maintainersRegistryService, 'getMaintainerById')
        .mockImplementation(() => Promise.resolve(null));

      const response = maintainersRegistryController.getMaintainerById('1');

      await expect(response).rejects.toThrow(HttpException);
    })
  })

  describe('createMaintainer', () => {
    it('should return the maintainer created if a maintainer was created', async () => {
      jest.spyOn(maintainersRegistryService, 'createMaintainer')
        .mockImplementation(() => Promise.resolve(maintainer));

      const response = maintainersRegistryController.createMaintainer(maintainer);
      
      await expect(response).resolves.toEqual(maintainer);
    })

    it('should thrown an HttpException if it couldn\'t create a maintainer', async () => {
      jest.spyOn(maintainersRegistryService, 'createMaintainer')
        .mockImplementation(() => Promise.reject(conflictDatabaseError));

      const response = maintainersRegistryController.createMaintainer(maintainer);
      
      await expect(response).rejects.toThrow(HttpException);
    })
  })
});
