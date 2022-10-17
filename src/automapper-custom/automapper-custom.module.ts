import { Module } from '@nestjs/common';
import { SensorScrapingDtoToParkingSensorAutomapper } from './sensor-scraping-dto-to-parking-sensor.automapper';
import { SensorScrapingDtoToSensorAutomapper } from './sensor-scraping-dto-to-sensor.automapper';

@Module({
    providers: [
        SensorScrapingDtoToSensorAutomapper,
        SensorScrapingDtoToParkingSensorAutomapper,
    ],
    exports: [
        SensorScrapingDtoToSensorAutomapper,
        SensorScrapingDtoToParkingSensorAutomapper,
    ]
})
export class AutomapperCustomModule {}
