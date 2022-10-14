import { classes } from "@automapper/classes";
import { createMapper } from "@automapper/core";
import { ParkingSpot } from "src/parking-spots/entities/parking-spot.entity";
import { Sensor } from "src/sensors/entities/sensor.entity";
import { SensorScrapingDtoToParkingSpotAutomapper } from "./sensor-scraping-dto-to-parking-spot.automapper";
import { SensorScrapingDtoToSensorAutomapper } from "./sensor-scraping-dto-to-sensor.automapper";

describe('AutomapperCustom', () => {
    let sensorScrapingDtoToSensorAutomapper: SensorScrapingDtoToSensorAutomapper;
    let sensorScrapingDtoToParkingSpotAutomapper: SensorScrapingDtoToParkingSpotAutomapper;
    let sensorScrapingDto; 
    let sensor: Partial<Sensor>; 
    let parkingSpot: Partial<ParkingSpot>; 

    sensorScrapingDtoToSensorAutomapper = 
        new SensorScrapingDtoToSensorAutomapper(createMapper({
            strategyInitializer: classes(),
        }));
    sensorScrapingDtoToParkingSpotAutomapper = 
        new SensorScrapingDtoToParkingSpotAutomapper(
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
        type: 'ParkingSensor',
        isActive: true,
        };

    describe('SensorScrapingDtoToSensorAutomapper', () => {
        it('sensor object mapped sould be consistent with dto', () => {

            const sensorConverted: Sensor = sensorScrapingDtoToSensorAutomapper.map(sensorScrapingDto);

            expect(sensorConverted).toEqual(sensor);
        })
    })

    describe('SensorScrapingDtoToParkingSpotAutomapper', () => {
        it('sensor object mapped sould be consistent with dto', () => {
            const sensorConverted: Sensor = sensorScrapingDtoToSensorAutomapper.map(sensorScrapingDto);
            parkingSpot = {
                latitude: '45.389040',
                longitude: '11.928577', 
            }

            const parkingSpotCoverted: ParkingSpot = 
                sensorScrapingDtoToParkingSpotAutomapper.map(sensorScrapingDto);

            expect(parkingSpotCoverted).toEqual(parkingSpot);
        })
    })
})