import { Injectable } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { Sensor } from './entities/sensor.entity';
import { SensorsRepository } from './sensors.repository';

@Injectable()
export class SensorsService {
    constructor(
            private sensorsRepository: SensorsRepository
        ){}

    createOrUpdateSensors(sensors: Sensor[]){
        return this.sensorsRepository.save(sensors);
    }

    getAllSensors(){
        return this.sensorsRepository.find();
    }

    getSensorById(id: string){
        return this.sensorsRepository.findOne({
            where: {
                id: id
            }
        })
    }

    getSensorsWithoutSensorMaintenance(){
        return this.sensorsRepository
            .getSensorsWithoutSensorMaintenance()
    }

    getAllSensorsByParkingSpotId(id: string){
        return this.sensorsRepository.find({
            relations: {
               parkingSpots: false,
            },
            where: {
                parkingSpots: {
                    id: id,
                }
            }
        })
    }

    getAllSensorsWithSensorMaintenance(){
        return this.sensorsRepository.find({
            relations: {
                sensorMaintenance: true,
            }
        })
    }

    getSensorByIdWithSensorMaintenance(id: string){
        return this.sensorsRepository.findOne({
            relations: {
                sensorMaintenance: true,
            },
            where: {
                id: id,
            }
        })
    }
}
