import { Injectable } from '@nestjs/common';
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
}
