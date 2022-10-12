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
}
