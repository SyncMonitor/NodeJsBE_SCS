import { SensorMaintenance } from "src/sensors-maintenance/entities/sensor-maintenance.entity";
import { Sensor } from "src/sensors/entities/sensor.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'maintainer_registry'
})
export class MaintainerRegistry{
    
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
	id: string;

	@Column({ name: 'name' })
	ownerName: string;

	@Column({ name: 'surname' })
	ownerSurname: string;

    @Column()
	company: string;

	@Column()
	phone: string;

    @Column({ name: 'mail' })
	email: string;

    @OneToMany(() => Sensor, (sensor) => sensor.maintainerRegistry)
    sensors: Sensor[];
}