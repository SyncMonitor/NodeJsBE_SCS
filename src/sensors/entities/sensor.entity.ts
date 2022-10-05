import { ParkingArea } from "src/parking-areas/entities/parking-area.entity";
import { SensorMaintainer } from "src/sensors-maintainers/entities/sensor-maintainer.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'sensors'
})
export class Sensor{

    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

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

    @Column({
        name: 'last_survey'
    })
	lastSurvey: Date;

    @OneToOne(() => ParkingArea, (parkingArea) => parkingArea.sensor)
    parkingArea: ParkingArea;

    @OneToOne(() => SensorMaintainer, ((sensorMaintainer) => sensorMaintainer.sensor))
    sensorMaintainer: SensorMaintainer;
}