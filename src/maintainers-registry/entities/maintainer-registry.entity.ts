import { SensorMaintainer } from "src/sensors-maintainers/entities/sensor-maintainer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'maintainer_registry'
})
export class MaintainerRegistry{
    
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
	id: number;

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

    @OneToMany(() => SensorMaintainer, (sensorMaintainer) => sensorMaintainer.maintainer)
    sensorsMaintainer: SensorMaintainer[];
}