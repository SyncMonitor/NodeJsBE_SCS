import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorMaintenance } from 'src/sensors-maintenance/entities/sensor-maintenance.entity';
import { MaintainerRegistry } from './entities/maintainer-registry.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ MaintainerRegistry ]),
        forwardRef(() => SensorMaintenance),
    ]
})
export class MaintainersRegistryModule {}
