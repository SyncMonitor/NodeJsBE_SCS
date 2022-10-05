import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsMaintainersModule } from 'src/sensors-maintainers/sensors-maintainers.module';
import { MaintainerRegistry } from './entities/maintainer-registry.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ MaintainerRegistry ]),
        forwardRef(() => SensorsMaintainersModule),
    ]
})
export class MaintainersRegistryModule {}
