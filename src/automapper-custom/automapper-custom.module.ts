import { Module } from '@nestjs/common';
import { SensorScrapingDtoToSensorAutomapper } from './sensor-scraping-dto-to-sensor.automapper';

@Module({
    providers: [
        SensorScrapingDtoToSensorAutomapper
    ],
    exports: [
        SensorScrapingDtoToSensorAutomapper,
    ]
})
export class AutomapperCustomModule {}
