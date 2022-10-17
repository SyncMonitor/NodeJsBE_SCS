import { classes } from "@automapper/classes";
import { createMapper } from "@automapper/core";
import { ParkingSensor } from "src/parking-sensors/entities/parking-sensor.entity";
import { Sensor } from "src/sensors/entities/sensor.entity";
import { SensorScrapingDtoToParkingSensorAutomapper } from "./sensor-scraping-dto-to-parking-sensor.automapper";
import { SensorScrapingDtoToSensorAutomapper } from "./sensor-scraping-dto-to-sensor.automapper";

describe('AutomapperCustom', () => {
    let sensorScrapingDtoToSensorAutomapper: SensorScrapingDtoToSensorAutomapper;
    let sensorScrapingDtoToParkingSensorAutomapper: SensorScrapingDtoToParkingSensorAutomapper;
    let sensorScrapingDto; 
    let sensor: Partial<Sensor>; 
    let parkingSensor: Partial<ParkingSensor>; 

    sensorScrapingDtoToSensorAutomapper = 
        new SensorScrapingDtoToSensorAutomapper(createMapper({
            strategyInitializer: classes(),
        }));
        sensorScrapingDtoToParkingSensorAutomapper = 
        new SensorScrapingDtoToParkingSensorAutomapper(
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

    describe('sensorScrapingDtoToParkingSensorAutomapper', () => {
        it('sensor object mapped sould be consistent with dto', () => {
            const sensorConverted: Sensor = sensorScrapingDtoToSensorAutomapper.map(sensorScrapingDto);
            parkingSensor = {
                address: 'Padova Galleria Spagna',
                latitude: '45.389040',
                longitude: '11.928577', 
                value: false,
                sensor: sensorConverted
            }

            const parkingSensorCoverted: ParkingSensor = 
            sensorScrapingDtoToParkingSensorAutomapper.map(sensorScrapingDto);

            expect(parkingSensorCoverted).toEqual(parkingSensor);
        })
    })
})