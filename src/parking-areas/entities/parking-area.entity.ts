import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ParkingSpot } from "src/parking-spots/entities/parking-spot.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'parking_areas' })
@Unique([ 'latitude', 'longitude' ])
export class ParkingArea{

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    address: string

    @Column()
    @IsNumberString()
    @IsNotEmpty()
    latitude: string

    @Column()
    @IsNumberString()
    @IsNotEmpty()
    longitude: string

    @OneToMany(() => ParkingSpot, (parkingSpot) => parkingSpot.parkingArea)
    parkingSpots: ParkingSpot[]

}