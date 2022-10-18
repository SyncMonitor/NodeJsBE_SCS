import { LoggerFile } from "src/logger-file/logger-file.service";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { Sensor } from "./sensor.entity";

@EventSubscriber()
export class SensorSubscriber 
    implements EntitySubscriberInterface<Sensor>{
    private readonly loggerFile: LoggerFile;

    constructor(){
        this.loggerFile = new LoggerFile();
        this.loggerFile.setContext('SensorSubscriber')
    }
    
    listenTo(): string | Function {
        return Sensor;
    }

    afterInsert(event: InsertEvent<Sensor>): void | Promise<any> {
        this.loggerFile.log(`Inserted sensor with id ${event.entity.id}`)
    }

    afterUpdate(event: UpdateEvent<Sensor>): void | Promise<any> {
        this.loggerFile.log(`Updated sensor with id ${event.entity.id}`)
    }
}