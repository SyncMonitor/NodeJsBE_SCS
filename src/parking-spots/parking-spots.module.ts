import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpot } from './entities/parking-spot.entity';
import { ParkingSpotsRepository } from './parking-spots.repository';
import { ParkingSpotsService } from './parking-spots.service';
import { ParkingSpotsController } from './parking-spots.controller';
import { ParkingAreasModule } from 'src/parking-areas/parking-areas.module';
import { ParkingSpotsParkingAreasController } from './parking-spots-parking-areas.controller';
import { ParkingSpotsSensorsController } from './parking-spots-sensors.controller';
import { SensorsModule } from 'src/sensors/sensors.module';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ ParkingSpot ]),
        ParkingAreasModule,
        forwardRef(() => SensorsModule),
    ],
    controllers: [
        ParkingSpotsController, 
        ParkingSpotsParkingAreasController,
        ParkingSpotsSensorsController,
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
