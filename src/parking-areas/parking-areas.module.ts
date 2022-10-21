import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpotsModule } from 'src/parking-spots/parking-spots.module';
import { ParkingArea } from './entities/parking-area.entity';
import { ParkingAreasController } from './parking-areas.controller';
import { ParkingAreasRepository } from './parking-areas.repository';
import { ParkingAreasService } from './parking-areas.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ ParkingArea ]),
    ],
    controllers: [ParkingAreasController],
    providers: [
        ParkingAreasService,
        ParkingAreasRepository,
    ],
    exports: [
        ParkingAreasService,
    ]
})
export class ParkingAreasModule {}
