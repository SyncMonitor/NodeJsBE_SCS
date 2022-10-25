import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './entities/sensor.entity';
import { SensorsRepository } from './sensors.repository';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { SensorsParkingSpotsController } from './sensors-parking-spots.controller';
import { ParkingSpotsModule } from 'src/parking-spots/parking-spots.module';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ Sensor ]),
        forwardRef(() => ParkingSpotsModule),
    ],
    providers: [
        SensorsService,
        SensorsRepository,
    ],
    exports: [ SensorsService ],
    controllers: [
        SensorsController,
        SensorsParkingSpotsController,
    ],
})
export class SensorsModule {}
