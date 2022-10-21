import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpot } from './entities/parking-spot.entity';
import { ParkingSpotsRepository } from './parking-spots.repository';
import { ParkingSpotsService } from './parking-spots.service';
import { ParkingSpotsController } from './parking-spots.controller';
import { ParkingAreasModule } from 'src/parking-areas/parking-areas.module';
import { ParkingSpotsParkingAreasController } from './parking-spots-parking-areas.controller';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ ParkingSpot ]),
        ParkingAreasModule,
    ],
    controllers: [
        ParkingSpotsController, 
        ParkingSpotsParkingAreasController,
    ],
    providers: [
        ParkingSpotsService,
        ParkingSpotsRepository,
    ],
    exports: [],
})
export class ParkingSpotsModule {}
