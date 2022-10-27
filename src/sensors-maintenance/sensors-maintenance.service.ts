import { Injectable } from '@nestjs/common';
import { SensorMaintenance } from './entities/sensor-maintenance.entity';
import { SensorsMaintenanceRepository } from './sensors-maintenance.registry';
import { isEmpty } from 'underscore';
import { Sensor } from 'src/sensors/entities/sensor.entity';
import { SensorsService } from 'src/sensors/sensors.service';
import { NotFoundError } from 'src/exceptions/not-found.exception';
import { UpdateError } from 'src/exceptions/update.exception';

@Injectable()
export class SensorsMaintenanceService {
    constructor(
        private readonly sensorsMaintenanceRepository: 
            SensorsMaintenanceRepository,
        private readonly sensorsService: SensorsService,
    ){}

    getSensorMaintenanceById(id: string){
        return this.sensorsMaintenanceRepository.findOne({
            where: {
                id: id,
            }
        })
    }

    async getSensorMaintenanceBySensorId(id: string){
        const sensor = await this.sensorsService.getSensorById(id);

        if(isEmpty(sensor))
            throw new NotFoundError('sensor id not found');

        return this.sensorsMaintenanceRepository.findOne({
            relations: {
                sensor: false,
            },
            where: {
                sensor: {
                    id: id,
                }
            }
        })
    }

    async createSensorsMaintenance(sensorsMaintenance: SensorMaintenance[]){
        if(isEmpty(sensorsMaintenance)) return [];

        const response = 
            await this.sensorsMaintenanceRepository.insert(sensorsMaintenance);
        const sensorsMaintenanceInsertedIds = response.identifiers;
        
        const sensorsMaintenanceInserted =
            this.sensorsMaintenanceRepository.findBy(sensorsMaintenanceInsertedIds);

        return sensorsMaintenanceInserted;
    }

    createArrayOfSensorsMaintenance(sensors: Sensor[]){
        let sensorsMaintenance = [];
        sensors.forEach(element => {
            sensorsMaintenance.push({
                sensor: element,
            })
        });

        return sensorsMaintenance;
    }

    async editSensorMaintenanceBySensorId(id: string, sensorMaintenance: SensorMaintenance){
        if(isEmpty(await this.sensorsService.getSensorById(id)))
            throw new NotFoundError('sensor id not found');

        const sensorMaintenanceDatabase =
            await this.getSensorMaintenanceBySensorId(id);


        if(isEmpty(sensorMaintenanceDatabase))
            throw new NotFoundError('sensor maintenance not found');

        const updateResponse = 
            await this.sensorsMaintenanceRepository
                .update(sensorMaintenanceDatabase.id, sensorMaintenance);

        const numberRowAffected = updateResponse.affected;

        if(numberRowAffected !== 1)
            throw new UpdateError('problem to update record');

        
        return this.getSensorMaintenanceById(sensorMaintenanceDatabase.id);
    }
}
