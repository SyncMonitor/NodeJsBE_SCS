import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Sensor } from "./entities/sensor.entity";

@Injectable()
export class SensorsRepository extends Repository<Sensor>{
    
    constructor(private dataSource: DataSource){
        super(Sensor, dataSource.createEntityManager());
    }
}