import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ParkingSpot } from "./entities/parking-spot.entity";

@Injectable()
export class ParkingSpotsRepository extends Repository<ParkingSpot>{

    constructor(private dataSource: DataSource){
        super(ParkingSpot, dataSource.createEntityManager())
    }
}