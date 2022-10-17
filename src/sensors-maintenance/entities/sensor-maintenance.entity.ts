import { MaintainerRegistry } from "src/maintainers-registry/entities/maintainer-registry.entity";
import { Sensor } from "src/sensors/entities/sensor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sensors_maintenance' })
export class SensorMaintenance{

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
	id: string;

	@Column({ name: 'to_be_repaired' })
	toBeRepaired: boolean;

	@Column({ name: 'to_be_charged' })
	toBeCharged: boolean;

	@Column({ name: 'is_updating' })
	isUpdating: boolean;

    @OneToOne(
        () => Sensor, 
        (sensor) => sensor.sensorMaintenance,
        { nullable: false })
    @JoinColumn({ name: 'fk_sensor_id' })
    sensor: Sensor
}