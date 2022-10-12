import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingAreasModule } from 'src/parking-areas/parking-areas.module';
import { SensorsMaintainersModule } from 'src/sensors-maintainers/sensors-maintainers.module';
import { Sensor } from './entities/sensor.entity';
import { SensorsRepository } from './sensors.repository';
import { SensorsService } from './sensors.service';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ Sensor ]),
        forwardRef(() => ParkingAreasModule),
        forwardRef(() => SensorsMaintainersModule),
    ],
    providers: [
        SensorsService,
        SensorsRepository,
    ],
    exports: [ SensorsService ],
})
export class SensorsModule {}
