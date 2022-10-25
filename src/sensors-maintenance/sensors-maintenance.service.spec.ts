import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { SensorsMaintenanceRepository } from './sensors-maintenance.registry';
import { SensorsMaintenanceService } from './sensors-maintenance.service';
import { isEmpty } from 'underscore';
import { MaintainerRegistry } from 'src/maintainers-registry/entities/maintainer-registry.entity';
import { SensorMaintenance } from './entities/sensor-maintenance.entity';
import { Sensor } from 'src/sensors/entities/sensor.entity';

describe('SensorsMaintenanceService', () => {
  let sensorsMaintenanceService: SensorsMaintenanceService;
  let sensorsMaintenanceRepository: SensorsMaintenanceRepository;
  let sensorsMaintenance;
  let insertResponse;
  let findByResponse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ 
        SensorsMaintenanceService,
        {
            provide: SensorsMaintenanceRepository,
            useValue: createMock<SensorsMaintenanceRepository>(),
        }
    ]
    }).compile();

    sensorsMaintenanceService = 
        module.get<SensorsMaintenanceService>(SensorsMaintenanceService);
    sensorsMaintenanceRepository = 
        module.get<SensorsMaintenanceRepository>(SensorsMaintenanceRepository);
    sensorsMaintenance = [
        {
          sensor: {
            id: '1',
            name: '156A2B7113',
            battery: '3,7V',
            charge: '3',
            type: 'ParkingSensor',
            isActive: true,
            lastSurvey: Date(),
          }
        },
        {
          sensor: {
            id: '2',
            name: '156A2C71',
            battery: '3,7V',
            charge: '3',
            type: 'ParkingSensor',
            isActive: true,
            lastSurvey: Date(),
          }
        }
    ];
    insertResponse = {
        identifiers: [ { id: '1' }, { id: '2' } ],
        generatedMaps: [
          {
            id: '1',
            toBeRepaired: false,
            toBeCharged: false,
            isUpdating: false
          },
          {
            id: '2',
            toBeRepaired: false,
            toBeCharged: false,
            isUpdating: false
          }
        ],
        raw: [
          {
            id: '1',
            to_be_repaired: false,
            to_be_charged: false,
            is_updating: false
          },
          {
            id: '2',
            to_be_repaired: false,
            to_be_charged: false,
            is_updating: false
          }
        ]
    }
    findByResponse = [
        {
          id: '1',
          toBeRepaired: false,
          toBeCharged: false,
          isUpdating: false
        },
        {
          id: '2',
          toBeRepaired: false,
          toBeCharged: false,
          isUpdating: false
        }
    ]
  });

  describe('createSensorsMaintenance', () => {
    it('should return an empty array if sensors maintenance passed is empty', async () => {
        const returnValue = sensorsMaintenanceService.createSensorsMaintenance([]);

        await expect(returnValue).resolves.toEqual([]);
    });

    it('should return an array of sensors maintenance created if it created them', async () => {
        jest.spyOn(sensorsMaintenanceRepository, 'insert')
            .mockImplementation(() => Promise.resolve(insertResponse));
        jest.spyOn(sensorsMaintenanceRepository, 'findBy')
            .mockImplementation(() => Promise.resolve(findByResponse))

        const returnValue = 
            sensorsMaintenanceService.createSensorsMaintenance(sensorsMaintenance);

       await expect(returnValue).resolves.toEqual(findByResponse);
    });
  });

  describe('createArrayOfSensorsMaintenance', () => {
        it('should return an array of SensorMaintenance from an array of Sensor', () => {
            const date = new Date();
            const sensors = [
                {
                    'id': '1',
                    'name': '156A2B71',
                    'battery': '3,7V',
                    'charge': '3',
                    'type': 'ParkingSensor',
                    'isActive': true,
                    'lastSurvey': date,
                },
                {
                    'id': '2',
                    'name': '156A2C72',
                    'battery': '3,7V',
                    'charge': '3',
                    'type': 'ParkingSensor',
                    'isActive': true,
                    'lastSurvey': date,
                }
            ];
            const sensorsMaintenance = [
                {
                    sensor: {
                        'id': '1',
                        'name': '156A2B71',
                        'battery': '3,7V',
                        'charge': '3',
                        'type': 'ParkingSensor',
                        'isActive': true,
                        'lastSurvey': date,
                    }
                },
                {
                    sensor: {
                        'id': '2',
                        'name': '156A2C72',
                        'battery': '3,7V',
                        'charge': '3',
                        'type': 'ParkingSensor',
                        'isActive': true,
                        'lastSurvey': date,
                    }
                }
            ];

            const returnValue = sensorsMaintenanceService.createArrayOfSensorsMaintenance(sensors as Sensor[]);

            expect(returnValue).toEqual(sensorsMaintenance);
        })
    })
});
