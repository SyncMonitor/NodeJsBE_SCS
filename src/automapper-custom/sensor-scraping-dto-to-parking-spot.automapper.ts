import { createMap, extend, forMember, fromValue, mapFrom, Mapper, MappingProfile, mapWithArguments } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { ParkingSpot } from "src/parking-spots/entities/parking-spot.entity";
import { SensorScrapingDto } from "src/sensors-scraping/dto/sensor-scraping.dto";
import { SensorScrapingDtoToSensorAutomapper } from "./sensor-scraping-dto-to-sensor.automapper";

@Injectable() // TODO: figure out if make sense to test this module
export class SensorScrapingDtoToParkingSpotAutomapper 
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
            createMap(this.mapper, SensorScrapingDto, ParkingSpot,
                forMember(
                    destination => destination.latitude,
                    mapFrom(source => String(source.lat))
                ),
                forMember(
                    destination => destination.longitude,
                    mapFrom(source => String(source.lng))
                ),
                forMember(
                    destination => destination.address,
                    mapFrom(source => String(source.address))
                ),
                forMember(
                    destination => destination.value,
                    mapFrom(source => parseInt(String(source.state)) !== 0)
                ),
                forMember(
                    destination => destination.address,
                    mapFrom(source => String(source.address))
                ),
                forMember(
                    destination => destination.sensor,
                    mapFrom(source => this.sensorScrapingDtoToSensorAutomapper.map(source))
                ),
            )
        }
    }

    map(sensorScrapingDto: SensorScrapingDto): ParkingSpot{
        return this.mapper.map(sensorScrapingDto, SensorScrapingDto, ParkingSpot)
    }

    mapFromArray(sensorScrapingDto: SensorScrapingDto[]): ParkingSpot[]{
        return sensorScrapingDto.map((item) => this.map(item));
    }
}