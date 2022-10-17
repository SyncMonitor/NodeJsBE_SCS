import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SensorsScrapingService } from './sensors-scraping.service';
import { DtoValidatorModule } from 'src/dto-validator/dto-validator.module';
import { AutomapperCustomModule } from 'src/automapper-custom/automapper-custom.module';
import { SensorsModule } from 'src/sensors/sensors.module';
import { ParkingSpotsModule } from 'src/parking-spots/parking-spots.module';
import { ParkingSensorsModule } from 'src/parking-sensors/parking-sensors.module';

@Module({
  imports: [
    AutomapperCustomModule,
    DtoValidatorModule,
    SensorsModule,
    ParkingSpotsModule,
    ScheduleModule.forRoot(),
    HttpModule,
    ParkingSensorsModule,
  ],
  providers: [SensorsScrapingService],
})
export class SensorsScrapingModule {}
