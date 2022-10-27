import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { SensorsMaintenanceRepository } from './sensors-maintenance.registry';
import { SensorsMaintenanceService } from './sensors-maintenance.service';
import { Sensor } from 'src/sensors/entities/sensor.entity';
import { SensorsService } from 'src/sensors/sensors.service';
import { NotFoundError } from 'src/exceptions/not-found.exception';
import { UpdateError } from 'src/exceptions/update.exception';

describe('SensorsMaintenanceService', () => {
  let sensorsMaintenanceService: SensorsMaintenanceService;
  let sensorsMaintenanceRepository: SensorsMaintenanceRepository;
  let sensorsService: SensorsService;
  let sensorsMaintenance;
  let sensorMaintenance;
  let sensor;
  let insertResponse;
  let recordUpdatedResponse;
  let recordNotUpdatedResponse;
  let findByResponse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ 
        SensorsMaintenanceService,
        {
          provide: SensorsMaintenanceRepository,
          useValue: createMock<SensorsMaintenanceRepository>(),
        },
        {
          provide: SensorsService,
          useValue: createMock<SensorsService>(),
        }
    ]
    }).compile();

    sensorsMaintenanceService = 
      module.get<SensorsMaintenanceService>(SensorsMaintenanceService);
    sensorsMaintenanceRepository = 
      module.get<SensorsMaintenanceRepository>(SensorsMaintenanceRepository);
    sensorsService =
      module.get<SensorsService>(SensorsService);
  });

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

  sensorMaintenance = {
    id: '1',
    toBeRepaired: false,
    toBeCharged: false,
    isUpdating: false,
  }

  sensor= {
    id: '1',
    name: '156A2B7113',
    battery: '3,7V',
    charge: '3',
    type: 'ParkingSensor',
    isActive: true,
    lastSurvey: Date(),
  }

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
  };

  recordUpdatedResponse = { generatedMaps: [], raw: [], affected: 1 };
  recordNotUpdatedResponse = { generatedMaps: [], raw: [], affected: 0 };

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
  ];

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
    });

    describe('getSensorMaintenanceBySensorId', () => {
      it('should return the sensor maintenance if the sensor was found', async () => {
        jest.spyOn(sensorsService, 'getSensorById')
          .mockImplementation(() => Promise.resolve(sensor));
        jest.spyOn(sensorsMaintenanceService, 'getSensorMaintenanceBySensorId')
          .mockImplementation(() => Promise.resolve(sensorMaintenance));
        jest.spyOn(sensorsMaintenanceRepository, 'update')
          .mockImplementation(() => Promise.resolve(recordUpdatedResponse));
        jest.spyOn(sensorsMaintenanceService, 'getSensorMaintenanceById')
          .mockImplementation(() => Promise.resolve(sensorMaintenance));

        const response =
          sensorsMaintenanceService.editSensorMaintenanceBySensorId('1', sensorMaintenance);

        await expect(response).resolves.toEqual(sensorMaintenance);
      });

      it('should throw a NotFoundError if the sensor wasn\'t found', async () => {
        jest.spyOn(sensorsService, 'getSensorById')
          .mockImplementation(() => Promise.resolve(null));

        const response =
          sensorsMaintenanceService.editSensorMaintenanceBySensorId('1', sensorMaintenance);

        await expect(response).rejects.toThrow(new NotFoundError('sensor id not found'));
      });

      it('should throw a NotFoundError if the sensor maintenance wasn\'t found', async () => {
        jest.spyOn(sensorsService, 'getSensorById')
          .mockImplementation(() => Promise.resolve(sensor));
        jest.spyOn(sensorsMaintenanceService, 'getSensorMaintenanceBySensorId')
          .mockImplementation(() => Promise.resolve(null));

        const response =
          sensorsMaintenanceService.editSensorMaintenanceBySensorId('1', sensorMaintenance);

        await expect(response).rejects.toThrow(new NotFoundError('sensor maintenance not found'));
      });

      it('should throw an UpdateError if it couldn\'t update the record', async () => {
        jest.spyOn(sensorsService, 'getSensorById')
          .mockImplementation(() => Promise.resolve(sensor));
        jest.spyOn(sensorsMaintenanceService, 'getSensorMaintenanceBySensorId')
          .mockImplementation(() => Promise.resolve(sensorMaintenance));
        jest.spyOn(sensorsMaintenanceRepository, 'update')
          .mockImplementation(() => Promise.resolve(recordNotUpdatedResponse));
        
        const response =
          sensorsMaintenanceService.editSensorMaintenanceBySensorId('1', sensorMaintenance);

        await expect(response).rejects.toThrow(UpdateError);
      });
    });
});
