import { IsEmail, IsPhoneNumber, IsString } from "class-validator";
import { SensorMaintenance } from "src/sensors-maintenance/entities/sensor-maintenance.entity";
import { Sensor } from "src/sensors/entities/sensor.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'maintainers_registry' })
export class MaintainerRegistry{
    
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
	id: string;

	@Column()
	@IsString()
	name: string;

	@Column()
	@IsString()
	surname: string;

    @Column({ unique: true })
	@IsString()
	company: string;

	@Column({ unique: true })
	@IsString()
	phone: string;

    @Column({ unique: true })
	@IsEmail()
	email: string;

    @OneToMany(() => Sensor, (sensor) => sensor.maintainerRegistry)
    sensors: Sensor[];
}