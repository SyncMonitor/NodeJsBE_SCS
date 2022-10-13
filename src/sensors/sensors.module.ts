import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpotsModule } from 'src/parking-spots/parking-spots.module';
import { SensorsMaintenanceModule } from 'src/sensors-maintenance/sensors-maintenance.module';
import { Sensor } from './entities/sensor.entity';
import { SensorsRepository } from './sensors.repository';
import { SensorsService } from './sensors.service';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ Sensor ]),
        forwardRef(() => ParkingSpotsModule),
        forwardRef(() => SensorsMaintenanceModule),
    ],
    providers: [
        SensorsService,
        SensorsRepository,
    ],
    exports: [ SensorsService ],
})
export class SensorsModule {}
