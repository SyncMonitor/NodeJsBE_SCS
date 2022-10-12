import { Injectable } from "@nestjs/common";
import { DataSource, Not, Repository } from "typeorm";
import { Sensor } from "./entities/sensor.entity";

@Injectable()
export class SensorsRepository extends Repository<Sensor>{
    constructor(private dataSource: DataSource){
        super(Sensor, dataSource.createEntityManager());
    }

    async upsertCustom(sensors: Sensor[]){

        const columnNames = this.dataSource.getMetadata(Sensor).columns.map((item) => item.databaseName)
        // columnNames = columnNames.filter(item => item !== 'id')

        // this.query(`INSERT INTO sensors
        //             VALUES $2
        //             ON CONFLICT ($1) DO UPDATE
        //             SET firstName = EXCLUDED.firstName
        //             WHERE user.firstName IS DISTINCT FROM EXCLUDED.firstName`)

        // const dbSensors = await this.dataSource
        // .createQueryBuilder()
        // .select("Sensors")
        // .from(Sensor,"Sensors")
        // .getMany()

        // sensors[0].lastSurvey= new Date('2022-10-12T09:02:09.102Z')
        // console.log(dbSensors[0])
        // console.log(sensors[0])
        // console.log(dbSensors.includes(sensors[0]))

        // sensors[0].name = 'mario'
        // console.log(await this.find({
        //     where: Not(sensors)
        // }));

        this.dataSource
            .createQueryBuilder()
            .update()
            .update
                

        return this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Sensor)
            .values(sensors)
            .orUpdate(columnNames, [ 'id' ], )
            .execute();
            // .orUpdate(["id"], columnNames)
            // .printSql()
           // .execute()
    }
}