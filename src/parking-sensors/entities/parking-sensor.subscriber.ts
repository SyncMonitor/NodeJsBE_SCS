import { LoggerFile } from "src/logger-file/logger-file.service";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { ParkingSensor } from "./parking-sensor.entity";

@EventSubscriber()
export class ParkingSensorSubscriber 
    implements EntitySubscriberInterface<ParkingSensor>{
    private readonly loggerFile: LoggerFile;

    constructor(){
        this.loggerFile = new LoggerFile();
        this.loggerFile.setContext('ParkingSensorSubscriber')
    }
    
    listenTo(): string | Function {
        return ParkingSensor;
    }

    // FIXME: find a way to hide conflict insert
    afterInsert(event: InsertEvent<ParkingSensor>): void | Promise<any> {
        //this.loggerFile.log(`Inserted parking sensor with id ${event.entity.id}`)
    }

    // FIXME: find a way to retrieve the entity id from a query builder update
    afterUpdate(event: UpdateEvent<ParkingSensor>): void | Promise<any> {
        //this.loggerFile.log(`Updated parking sensor with id ${event.entity.id}`)
    }
}