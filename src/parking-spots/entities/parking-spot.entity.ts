import { ParkingArea } from "src/parking-areas/entities/parking-area.entity";
import { Sensor } from "src/sensors/entities/sensor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'parking_spots'
})
export class ParkingSpot{

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

    @ManyToOne(() => ParkingArea, (parkingArea) => parkingArea.parkingSpots)
    parkingArea: ParkingArea
}