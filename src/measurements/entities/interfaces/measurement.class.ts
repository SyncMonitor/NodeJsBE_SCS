import { Sensor } from "src/sensors/entities/sensor.entity";
import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// FIXME: figure out how to implement measurement entities
// TODO: figure out if it's possible to make this class an interface
export class Measurement{

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

    @ManyToOne(
            () => Sensor,
            { nullable: false }
        )//(sensor) => sensor.measurement)
    @JoinColumn({ name: 'fk_sensor_id' })
    sensor: Sensor

}