import { Module } from '@nestjs/common';
import { SensorScrapingDtoToParkingAreaAutomapper } from './sensor-scraping-dto-to-parking-area.automapper';
import { SensorScrapingDtoToSensorAutomapper } from './sensor-scraping-dto-to-sensor.automapper';

@Module({
    providers: [
        SensorScrapingDtoToSensorAutomapper,
        SensorScrapingDtoToParkingAreaAutomapper,
    ],
    exports: [
        SensorScrapingDtoToSensorAutomapper,
        SensorScrapingDtoToParkingAreaAutomapper,
    ]
})
export class AutomapperCustomModule {}
