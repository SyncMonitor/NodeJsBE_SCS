import { Sensor } from "src/sensors/entities/sensor.entity";
import { Column, JoinColumn, OneToOne } from "typeorm";
import { Measurement } from "./measurement.class";

export class ParkingMeasurements extends Measurement{
    @Column()
    value: boolean;

    @OneToOne(
        () => Sensor,
        { nullable: false }
    )//(sensor) => sensor.measurement)
    @JoinColumn({ name: 'fk_sensor_id' })
    sensor: Sensor
}