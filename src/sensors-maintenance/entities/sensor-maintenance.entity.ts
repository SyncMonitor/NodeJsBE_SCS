import { IsBoolean } from "class-validator";
import { MaintainerRegistry } from "src/maintainers-registry/entities/maintainer-registry.entity";
import { Sensor } from "src/sensors/entities/sensor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sensors_maintenance' })
export class SensorMaintenance{

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
	id: string;

	@Column({ 
        name: 'to_be_repaired',
        default: false,
    })
    @IsBoolean()
	toBeRepaired: boolean;

	@Column({ 
        name: 'to_be_charged',
        default: false,
    })
    @IsBoolean()
	toBeCharged: boolean;

	@Column({ 
        name: 'is_updating',
        default: false,
    })
    @IsBoolean()
	isUpdating: boolean;

    @OneToOne(
        () => Sensor, 
        (sensor) => sensor.sensorMaintenance,
        { nullable: false })
    @JoinColumn({ name: 'fk_sensor_id' })
    sensor: Sensor
}