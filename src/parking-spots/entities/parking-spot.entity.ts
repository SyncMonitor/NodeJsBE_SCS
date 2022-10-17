import { ParkingArea } from "src/parking-areas/entities/parking-area.entity";
import { Sensor } from "src/sensors/entities/sensor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'parking_spots' })
export class ParkingSpot{

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: string;

    @Column()
	latitude: string;

    @Column()
	longitude: string;

    @ManyToMany(() => Sensor)
    @JoinTable()
    sensors: Sensor[];

    @ManyToOne(
            () => ParkingArea, 
            (parkingArea) => parkingArea.parkingSpots,
            { nullable: false }
        )
    @JoinColumn({ name: 'fk_parking_area_id' })
    parkingArea: ParkingArea
}