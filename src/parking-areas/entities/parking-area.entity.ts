import { Sensor } from "src/sensors/entities/sensor.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'parking_area'
})
export class ParkingArea{

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: string;

    @Column()
	latitude: string;

    @Column()
	longitude: string;

    @Column()
	address: string;

    @Column()
	value: boolean;
	
	@UpdateDateColumn({
        name: 'last_update'
    })
	lastUpdate: Date;

    @OneToOne(() => Sensor)
    @JoinColumn({ name: 'fk_sensor_id' })
    sensor: Sensor;
}