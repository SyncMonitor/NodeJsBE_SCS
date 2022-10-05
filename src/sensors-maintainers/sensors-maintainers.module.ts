import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintainersRegistryModule } from 'src/maintainers-registry/maintainers-registry.module';
import { SensorsModule } from 'src/sensors/sensors.module';
import { SensorMaintainer } from './entities/sensor-maintainer.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ SensorMaintainer ]),
        forwardRef(() => SensorsModule),
        forwardRef(() => MaintainersRegistryModule),
    ],
})
export class SensorsMaintainersModule {}
