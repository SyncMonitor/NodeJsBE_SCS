import { MaintainerRegistry } from "src/maintainers-registry/entities/maintainer-registry.entity";
import { ParkingSpot } from "src/parking-spots/entities/parking-spot.entity";
import { SensorMaintenance } from "src/sensors-maintenance/entities/sensor-maintenance.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'sensors' })
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
    @ManyToMany(() => ParkingSpot, (parkingSpot) => parkingSpot.sensors)
    parkingSpots: ParkingSpot[]

    @ManyToOne(
            () => MaintainerRegistry, 
            ((maintainerRegistry) => maintainerRegistry.sensors),
            { onDelete: 'SET NULL' }
        )
    @JoinColumn({ name: 'fk_maintainer_id' })
    maintainerRegistry: MaintainerRegistry;

    @OneToOne(() => SensorMaintenance, (sensorMaintenance) => sensorMaintenance.sensor)
    sensorMaintenance: SensorMaintenance

    // TODO: find a way to define a plymorphic relationship, to enable this:
    // @OneToMany(() => Measurement, (measurement) => measurement.sensor)
    // measurements: Measurement[]
}