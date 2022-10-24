import { Injectable } from '@nestjs/common';
import { SensorMaintenance } from './entities/sensor-maintenance.entity';
import { SensorsMaintenanceRepository } from './sensors-maintenance.registry';
import { isEmpty } from 'underscore';
import { Sensor } from 'src/sensors/entities/sensor.entity';

@Injectable()
export class SensorsMaintenanceService {
    constructor(
        private readonly sensorsMaintenanceRepository: 
            SensorsMaintenanceRepository
    ){}

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
}
