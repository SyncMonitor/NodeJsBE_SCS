import { Sensor } from "src/sensors/entities/sensor.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'parking_sensors' })
export class ParkingSensor{
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: string;

    @Column()
    address: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @CreateDateColumn()
    timestamp: Date;

    @OneToOne(
        () => Sensor,
        { nullable: false }
    )//(sensor) => sensor.measurement)
    @JoinColumn({ name: 'fk_sensor_id' })
    sensor: Sensor
}