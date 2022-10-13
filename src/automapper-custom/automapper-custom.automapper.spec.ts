import { classes } from "@automapper/classes";
import { createMapper } from "@automapper/core";
import { ParkingArea } from "src/parking-areas/entities/parking-area.entity";
import { SensorScrapingDto } from "src/sensors-scraping/dto/sensor-scraping.dto"
import { Sensor } from "src/sensors/entities/sensor.entity";
import { SensorScrapingDtoToParkingAreaAutomapper } from "./sensor-scraping-dto-to-parking-area.automapper";
import { SensorScrapingDtoToSensorAutomapper } from "./sensor-scraping-dto-to-sensor.automapper";

describe('AutomapperCustom', () => {
    let sensorScrapingDtoToSensorAutomapper: SensorScrapingDtoToSensorAutomapper;
    let sensorScrapingDtoToParkingAreaAutomapper: SensorScrapingDtoToParkingAreaAutomapper;
    let sensorScrapingDto; 
    let sensor: Partial<Sensor>; 
    let parkingArea: Partial<ParkingArea>; 

    sensorScrapingDtoToSensorAutomapper = 
        new SensorScrapingDtoToSensorAutomapper(createMapper({
            strategyInitializer: classes(),
        }));
    sensorScrapingDtoToParkingAreaAutomapper = 
        new SensorScrapingDtoToParkingAreaAutomapper(
            createMapper({
                strategyInitializer: classes(),
            }),
            sensorScrapingDtoToSensorAutomapper,
        );
    sensorScrapingDto = {
        id: '1',
        name: '156A2C71',
        address: 'Padova Galleria Spagna',
        lat: '45.389040',
        lng: '11.928577',
        state: '0',
        battery: '3,7V',
        active: '1',
        };

    sensor = {
        id: '1',
        name: '156A2C71',
        battery: '3,7V',
        charge: '3',
        type: 'ParkingArea',
        isActive: true,
        };

    describe('SensorScrapingDtoToSensorAutomapper', () => {
        it('sensor object mapped sould be consistent with dto', () => {

            const sensorConverted: Sensor = sensorScrapingDtoToSensorAutomapper.map(sensorScrapingDto);

            expect(sensorConverted).toEqual(sensor);
        })
    })

    describe('SensorScrapingDtoToParkingAreaAutomapper', () => {
        it('sensor object mapped sould be consistent with dto', () => {
            const sensorConverted: Sensor = sensorScrapingDtoToSensorAutomapper.map(sensorScrapingDto);
            parkingArea = {
                latitude: '45.389040',
                longitude: '11.928577', 
                address: 'Padova Galleria Spagna',
                value: false,
                sensor: sensorConverted 
            }

            const parkingAreaCoverted: ParkingArea = 
                sensorScrapingDtoToParkingAreaAutomapper.map(sensorScrapingDto);

            expect(parkingAreaCoverted).toEqual(parkingArea);
        })
    })
})