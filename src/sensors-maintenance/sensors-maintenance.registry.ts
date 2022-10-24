import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SensorMaintenance } from "./entities/sensor-maintenance.entity";

@Injectable()
export class SensorsMaintenanceRepository extends Repository<SensorMaintenance>{
    constructor(private dataSource: DataSource){
        super(SensorMaintenance, dataSource.createEntityManager());
    }
}