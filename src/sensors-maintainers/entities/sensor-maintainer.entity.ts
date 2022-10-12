import { MaintainerRegistry } from "src/maintainers-registry/entities/maintainer-registry.entity";
import { Sensor } from "src/sensors/entities/sensor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'sensors_maintainer'
})
export class SensorMaintainer{

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
	id: string;

    @Column()
	type: string;

	@Column({ name: 'to_be_repaired' })
	toBeRepaired: boolean;

	@Column({ name: 'to_be_charged' })
	toBeCharged: boolean;

	@Column({ name: 'is_updating' })
	isUpdating: boolean;

    @OneToOne(() => Sensor)
    @JoinColumn({ name: 'fk_sensor_id' })
    sensor: Sensor;

    @ManyToOne(() => MaintainerRegistry, (maintainerRegistry) => maintainerRegistry.sensorsMaintainer)
    @JoinColumn({ name: 'maintainer_id' })
    maintainer: MaintainerRegistry;
}