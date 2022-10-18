import { Controller, Get } from '@nestjs/common';
import { SensorsScrapingService } from './sensors-scraping.service';

// TODO: remove this controller when finish to develop sensors scraping feature
@Controller('sensors-scraping')
export class SensorsScrapingController {
    constructor(private readonly sensorsScrapingService: 
        SensorsScrapingService){}

    @Get()
    test(){
        this.sensorsScrapingService.scrapeAndPersistSensors();
    }
}
