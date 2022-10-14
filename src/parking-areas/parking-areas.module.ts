import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingArea } from './entities/parking-area.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ ParkingArea ])
    ]
})
export class ParkingAreasModule {}
