import { ParkingSpot } from "src/parking-spots/entities/parking-spot.entity";
import { SensorMaintainer } from "src/sensors-maintainers/entities/sensor-maintainer.entity";
import { Column, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

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

    @OneToOne(() => ParkingSpot, (parkingSpot) => parkingSpot.sensor)
    parkingSpot: ParkingSpot;

    @OneToOne(() => SensorMaintainer, ((sensorMaintainer) => sensorMaintainer.sensor))
    sensorMaintainer: SensorMaintainer;
}