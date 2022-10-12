import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from './entities/sensor.entity';
import { SensorsRepository } from './sensors.repository';

@Injectable()
export class SensorsService {
    constructor(
            //@InjectRepository(Sensor) private sensorsRepository: Repository<Sensor>
            private sensorsRepository: SensorsRepository
        ){}

    createOrUpdateSensors(sensors: Sensor[]){
        // sensors = this.sensorsRepository.create(sensors)
        // console.log(sensors)
        return this.sensorsRepository.save(sensors);
        //return this.sensorsRepository.upsertCustom(sensors);
        
        // return this.sensorsRepository.upsert(sensors, {
        //     conflictPaths: ["id"],
        //     skipUpdateIfNoValuesChanged: false, // supported by postgres, skips update if it would not change row values
        // });
    }
}
