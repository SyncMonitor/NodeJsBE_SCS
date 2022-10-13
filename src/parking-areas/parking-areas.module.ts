import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsModule } from 'src/sensors/sensors.module';
import { ParkingArea } from './entities/parking-area.entity';
import { ParkingAreaRepository } from './parking-areas.repository';
import { ParkingAreasService } from './parking-areas.service';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ ParkingArea ]),
        forwardRef(() => SensorsModule),
    ],
    providers: [
        ParkingAreasService,
        ParkingAreaRepository,
    ],
    exports: [
        ParkingAreasService,
    ],
})
export class ParkingAreasModule {}
