import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ParkingArea } from "./entities/parking-area.entity";

@Injectable()
export class ParkingAreaRepository extends Repository<ParkingArea>{

    constructor(private dataSource: DataSource){
        super(ParkingArea, dataSource.createEntityManager())
    }
}