import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ParkingSensor } from "./entities/parking-sensor.entity";

@Injectable()
export class ParkingSensorsRepository extends Repository<ParkingSensor>{
    
    constructor(private dataSource: DataSource){
        super(ParkingSensor, dataSource.createEntityManager());
    }

    updateTimestamp(idsToUpdate: any[]){

        return this.dataSource
        .createQueryBuilder()
        .update(ParkingSensor)
        .set({ id: () => 'id' }) // dummy update, just to update timestamp column value
        .where('id IN (:...id)', {id: idsToUpdate})
        .execute()
        
    }
}