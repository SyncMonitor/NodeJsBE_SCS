import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SensorsScrapingService } from './sensors-scraping.service';
import { SensorsScrapingController } from './sensors-scraping.controller';
import { DtoValidatorModule } from 'src/dto-validator/dto-validator.module';
import { AutomapperCustomModule } from 'src/automapper-custom/automapper-custom.module';
import { SensorsModule } from 'src/sensors/sensors.module';
import { ParkingSpotsModule } from 'src/parking-spots/parking-spots.module';

@Module({
  imports: [
    AutomapperCustomModule,
    DtoValidatorModule,
    SensorsModule,
    ParkingSpotsModule,
    ScheduleModule.forRoot(),
    HttpModule,

  ],
  providers: [SensorsScrapingService],
  controllers: [SensorsScrapingController]
})
export class SensorsScrapingModule {}
