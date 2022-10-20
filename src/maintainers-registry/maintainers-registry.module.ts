import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintainerRegistry } from './entities/maintainer-registry.entity';
import { MaintainersRegistryController } from './maintainers-registry.controller';
import { MaintainersRegistryRepository } from './maintainers-registry.repository';
import { MaintainersRegistryService } from './maintainers-registry.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ MaintainerRegistry ]),
    ],
    controllers: [MaintainersRegistryController],
    providers: [
        MaintainersRegistryService,
        MaintainersRegistryRepository,
    ]
})
export class MaintainersRegistryModule {}
