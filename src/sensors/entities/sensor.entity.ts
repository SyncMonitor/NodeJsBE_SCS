import { AutoMap } from "@automapper/classes";
import { ParkingArea } from "src/parking-areas/entities/parking-area.entity";
import { SensorMaintainer } from "src/sensors-maintainers/entities/sensor-maintainer.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'sensors'
})
export class Sensor{

    @PrimaryColumn({
        type: 'bigint',
    })
    id: string;

    @Column()
    name: string;

    @Column()
	battery: string;

    @Column()
	charge: string;

    @Column()
	type: string;

    @Column({
        name: 'is_active'
    })
	isActive: boolean;

    @UpdateDateColumn({
        name: 'last_survey'
    })
	lastSurvey: Date;

    @OneToOne(() => ParkingArea, (parkingArea) => parkingArea.sensor)
    parkingArea: ParkingArea;

    @OneToOne(() => SensorMaintainer, ((sensorMaintainer) => sensorMaintainer.sensor))
    sensorMaintainer: SensorMaintainer;
}