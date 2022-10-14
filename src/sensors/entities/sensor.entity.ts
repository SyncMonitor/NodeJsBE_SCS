import { MaintainerRegistry } from "src/maintainers-registry/entities/maintainer-registry.entity";
import { Measurement } from "src/measurements/entities/interfaces/measurement.class";
import { SensorMaintenance } from "src/sensors-maintenance/entities/sensor-maintenance.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

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

    // TODO: figure out if here needs ManyToMany relashionship with ParkingSpot entity

    @ManyToOne(
            () => MaintainerRegistry, 
            ((maintainerRegistry) => maintainerRegistry.sensors),
        )
    @JoinColumn({ name: 'fk_maintainer_id' })
    maintainerRegistry: MaintainerRegistry;

    @OneToOne(() => SensorMaintenance, (sensorMaintenance) => sensorMaintenance.sensor)
    sensorMaintenance: SensorMaintenance

    // TODO: find a way to define a plymorphic relationship, to enable this:
    // @OneToMany(() => Measurement, (measurement) => measurement.sensor)
    // measurement: Measurement
}