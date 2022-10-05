import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsModule } from 'src/sensors/sensors.module';
import { ParkingArea } from './entities/parking-area.entity';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ ParkingArea ]),
        forwardRef(() => SensorsModule),
    ],
    exports: []
})
export class ParkingAreasModule {}
