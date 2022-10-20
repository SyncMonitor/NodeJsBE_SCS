import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { MaintainerRegistry } from "./entities/maintainer-registry.entity";

@Injectable()
export class MaintainersRegistryRepository extends Repository<MaintainerRegistry>{
    
    constructor(private dataSource: DataSource){
        super(MaintainerRegistry, dataSource.createEntityManager());
    }
}