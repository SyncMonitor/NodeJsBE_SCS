import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintainersRegistryModule } from 'src/maintainers-registry/maintainers-registry.module';
import { SensorsModule } from 'src/sensors/sensors.module';
import { SensorMaintenance } from './entities/sensor-maintenance.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ SensorMaintenance ]),
        forwardRef(() => SensorsModule),
        forwardRef(() => MaintainersRegistryModule),
    ],
})
export class SensorsMaintenanceModule {}
