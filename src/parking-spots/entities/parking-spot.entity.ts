import { IsNotEmpty, IsNumberString } from "class-validator";
import { ParkingArea } from "src/parking-areas/entities/parking-area.entity";
import { Sensor } from "src/sensors/entities/sensor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'parking_spots' })
@Unique([ 'latitude', 'longitude' ])
export class ParkingSpot{

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: string;

    @Column()
    @IsNumberString()
    @IsNotEmpty()
	latitude: string;

    @Column()
    @IsNumberString()
    @IsNotEmpty()
	longitude: string;

    @ManyToMany(
        () => Sensor, 
        (sensor) => sensor.parkingSpots,
        {onDelete: 'CASCADE'},
    )
    @JoinTable()
    sensors: Sensor[];

    @ManyToOne(
            () => ParkingArea, 
            (parkingArea) => parkingArea.parkingSpots,
            { 
                nullable: false,
                onDelete: 'CASCADE',
            }
        )
    @JoinColumn({ name: 'fk_parking_area_id' })
    parkingArea: ParkingArea
}