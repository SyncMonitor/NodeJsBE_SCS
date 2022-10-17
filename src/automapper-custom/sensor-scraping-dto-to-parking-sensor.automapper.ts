import { createMap, forMember, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { ParkingSensor } from "src/parking-sensors/entities/parking-sensor.entity";
import { SensorScrapingDto } from "src/sensors-scraping/dto/sensor-scraping.dto";
import { SensorScrapingDtoToSensorAutomapper } from "./sensor-scraping-dto-to-sensor.automapper";

@Injectable() // TODO: figure out if make sense to test this module
export class SensorScrapingDtoToParkingSensorAutomapper 
    extends AutomapperProfile{
    constructor(
        @InjectMapper() mapper: Mapper,
        private sensorScrapingDtoToSensorAutomapper: 
            SensorScrapingDtoToSensorAutomapper
        ){
            super(mapper);
        }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(this.mapper, SensorScrapingDto, ParkingSensor,
                forMember(
                    destination => destination.address,
                    mapFrom(source => String(source.address))
                ),
                forMember(
                    destination => destination.latitude,
                    mapFrom(source => String(source.lat))
                ),
                forMember(
                    destination => destination.longitude,
                    mapFrom(source => String(source.lng))
                ),
                forMember(
                    destination => destination.value,
                    mapFrom(source => parseInt(String(source.state)) !== 0)
                ),
                forMember(
                    destination => destination.sensor,
                    mapFrom(
                            source => this.sensorScrapingDtoToSensorAutomapper.map(source)
                        )
                ),
            )
        }
    }

    map(sensorScrapingDto: SensorScrapingDto): ParkingSensor{
        return this.mapper.map(sensorScrapingDto, SensorScrapingDto, ParkingSensor)
    }

    mapFromArray(sensorScrapingDto: SensorScrapingDto[]): ParkingSensor[]{
        return sensorScrapingDto.map((item) => this.map(item));
    }
}