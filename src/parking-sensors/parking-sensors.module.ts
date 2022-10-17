import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSensor } from './entities/parking-sensor.entity';
import { ParkingSensorsRepository } from './parking-sensors.repository';
import { ParkingSensorsService } from './parking-sensors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ParkingSensor
    ])
  ],
  providers: [
    ParkingSensorsService,
    ParkingSensorsRepository,
  ],
  exports: [
    ParkingSensorsService
  ]
})
export class ParkingSensorsModule {}
