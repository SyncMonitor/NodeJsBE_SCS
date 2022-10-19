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
    address: string

    @Column()
    latitude: string

    @Column()
    longitude: string

    @OneToMany(() => ParkingSpot, (parkingSpot) => parkingSpot.parkingArea)
    parkingSpots: ParkingSpot[]

}