import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSensor } from './entities/parking-sensor.entity';
import { ParkingSensorsRepository } from './parking-sensors.repository';
import { ParkingSensorsService } from './parking-sensors.service';
import { ParkingSensorsController } from './parking-sensors.controller';
import { ParkingSensorsSensorsController } from './parking-sensors-sensors.controller';
import { SensorsModule } from 'src/sensors/sensors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ParkingSensor
    ]),
    SensorsModule,
  ],
  controllers: [
    ParkingSensorsController,
    ParkingSensorsSensorsController,
  ],
  providers: [
    ParkingSensorsService,
    ParkingSensorsRepository,
  ],
  exports: [
    ParkingSensorsService
  ],
})
export class ParkingSensorsModule {}
