import { Module } from '@nestjs/common';
import { SensorScrapingDtoToParkingSpotAutomapper } from './sensor-scraping-dto-to-parking-spot.automapper';
import { SensorScrapingDtoToSensorAutomapper } from './sensor-scraping-dto-to-sensor.automapper';

@Module({
    providers: [
        SensorScrapingDtoToSensorAutomapper,
        SensorScrapingDtoToParkingSpotAutomapper
    ],
    exports: [
        SensorScrapingDtoToSensorAutomapper,
        SensorScrapingDtoToParkingSpotAutomapper,
    ]
})
export class AutomapperCustomModule {}
