import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintainerRegistry } from './entities/maintainer-registry.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ MaintainerRegistry ]),
    ]
})
export class MaintainersRegistryModule {}
