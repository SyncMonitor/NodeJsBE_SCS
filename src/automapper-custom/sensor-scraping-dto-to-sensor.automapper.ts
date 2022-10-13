import { createMap, extend, forMember, fromValue, mapFrom, Mapper, MappingProfile, mapWithArguments } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { SensorScrapingDto } from "src/sensors-scraping/dto/sensor-scraping.dto";
import { Sensor } from "src/sensors/entities/sensor.entity";

@Injectable() // TODO: figure out if make sense to test this module
export class SensorScrapingDtoToSensorAutomapper 
    extends AutomapperProfile{
    constructor(@InjectMapper() mapper: Mapper){
        super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(this.mapper, SensorScrapingDto, Sensor, 
                forMember(
                    destination => destination.id,
                    mapFrom(source => String(source.id))
                ),
                forMember(
                    destination => destination.name,
                    mapFrom(source => String(source.name))
                ),
                forMember(
                    destination => destination.battery,
                    mapFrom(source => String(source.battery))
                ),
                forMember(
                    destination => destination.charge,
                    mapFrom(source => String(
                            parseInt(String(source.battery)
                                .replace(',', '.').replace(/[^\d.-]/g, '')
                            )
                        ))
                ),
                forMember(
                    destination => destination.type,
                    fromValue('ParkingArea')
                ),
                forMember(
                    destination => destination.isActive,
                    mapFrom(source => parseInt(String(source.active)) !== 0)
                ),
            )
        }
    }

    map(sensorScrapingDto: SensorScrapingDto): Sensor{
        return this.mapper.map(sensorScrapingDto, SensorScrapingDto, Sensor)
    }

    mapFromArray(sensorScrapingDto: SensorScrapingDto[]): Sensor[]{
        return sensorScrapingDto.map((item) => this.map(item));
    }
}