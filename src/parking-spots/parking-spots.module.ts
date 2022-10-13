import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsModule } from 'src/sensors/sensors.module';
import { ParkingSpot } from './entities/parking-spot.entity';
import { ParkingSpotsRepository } from './parking-spots.repository';
import { ParkingSpotsService } from './parking-spots.service';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ ParkingSpot ]),
        forwardRef(() => SensorsModule),
    ],
    providers: [
        ParkingSpotsService,
        ParkingSpotsRepository,
    ],
    exports: [
        ParkingSpotsService,
    ],
})
export class ParkingSpotsModule {}
