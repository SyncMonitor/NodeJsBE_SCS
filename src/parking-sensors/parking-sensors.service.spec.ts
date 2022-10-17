import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSensorsRepository } from './parking-sensors.repository';
import { ParkingSensorsService } from './parking-sensors.service';
import { isEmpty } from 'underscore';

describe('ParkingSensorsService', () => {
  let parkingSensorsService: ParkingSensorsService;
  let parkingSensorsRepository: ParkingSensorsRepository;
  let parkingSensors;
  let upsertInsertedOrUpdatedResponse;
  let upsertNotInsertedOrUpdatedResponse;
  let updateTimestampResponse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingSensorsService,
        {
          provide: ParkingSensorsRepository,
          useValue: createMock<ParkingSensorsRepository>()
        },
      ],
    }).compile();

    parkingSensorsService = module.get<ParkingSensorsService>(ParkingSensorsService);
    parkingSensorsRepository = module.get<ParkingSensorsRepository>(ParkingSensorsRepository);
  });

  parkingSensors = [
      {
        address: 'Padova Galleria Spagna',
        latitude: '45.389040',
        longitude: '11.928577',
        value: false,
      },
      {
        address: 'Padova Galleria Spagna',
        latitude: '45.389029',
        longitude: '11.928598',
        value: true,
      },
  ];

  upsertInsertedOrUpdatedResponse = {
    identifiers: [
      { id: '1' }, 
      { id: '2' },
      undefined,
    ],
    generatedMaps: [
      { id: '1', timestamp: new Date() },
      { id: '2', timestamp: new Date() },
      {},
    ],
    raw: [
      { id: '1', timestamp: new Date() },
      { id: '2', timestamp: new Date() }
    ]
  };

  upsertNotInsertedOrUpdatedResponse = {
    identifiers: [
      undefined, 
      undefined,
      undefined,
    ],
    generatedMaps: [
      {},
      {},
      {},
    ],
    raw: [
      {},
      {}
    ]
  };

  updateTimestampResponse = {
    "generatedMaps": [],
    "raw": [],
    "affected": 2
}

  describe('createOrUpdateParkingSensors', () => {
    it('should return a not empty object if it inserted/updated some elements', async () => {
      jest.spyOn(parkingSensorsRepository, 'upsert').mockImplementation(() => upsertInsertedOrUpdatedResponse);
      jest.spyOn(parkingSensorsRepository, 'updateTimestamp').mockImplementation(() => updateTimestampResponse);

      const response = await parkingSensorsService.createOrUpdateParkingSensors(parkingSensors);

      expect(isEmpty(response)).toBeFalsy();
    })

    it('should return an empty object if it did not inserted/updated some elements', async () => {
      jest.spyOn(parkingSensorsRepository, 'upsert').mockImplementation(() => upsertNotInsertedOrUpdatedResponse);
      jest.spyOn(parkingSensorsRepository, 'updateTimestamp').mockImplementation(() => updateTimestampResponse);

      const response = await parkingSensorsService.createOrUpdateParkingSensors(parkingSensors);

      expect(isEmpty(response)).toBeTruthy();
    })
  })
});
