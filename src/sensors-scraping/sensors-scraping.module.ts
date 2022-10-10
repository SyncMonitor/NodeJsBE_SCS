import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SensorsScrapingService } from './sensors-scraping.service';
import { SensorsScrapingController } from './sensors-scraping.controller';
import { DtoValidatorModule } from 'src/dto-validator/dto-validator.module';

@Module({
  imports: [
    DtoValidatorModule,
    ScheduleModule.forRoot(),
    HttpModule
  ],
  providers: [SensorsScrapingService],
  controllers: [SensorsScrapingController]
})
export class SensorsScrapingModule {}
