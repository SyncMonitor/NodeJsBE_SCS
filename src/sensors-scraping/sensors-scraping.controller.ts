import { Controller, Get } from '@nestjs/common';
import { SensorsScrapingService } from './sensors-scraping.service';

@Controller('sensors-scraping')
export class SensorsScrapingController {
    constructor(private sensorsService: SensorsScrapingService){}

    @Get()
    test(){
        return this.sensorsService.scrapeAndPersistSensors()
    }
}
