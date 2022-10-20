import { Injectable } from '@nestjs/common';
import { MaintainerRegistry } from './entities/maintainer-registry.entity';
import { MaintainersRegistryRepository } from './maintainers-registry.repository';

@Injectable()
export class MaintainersRegistryService {
    constructor(private readonly maintainersRegistryRepository: 
        MaintainersRegistryRepository){}

    getAllMaintainers(){
        return this.maintainersRegistryRepository.find();
    }

    getMaintainerById(id: string){
        return this.maintainersRegistryRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async createMaintainer(maintainer: MaintainerRegistry){
        const response = 
            await this.maintainersRegistryRepository.insert(maintainer);
        const maintainerInsertedId = response.identifiers[0].id;

        return this.getMaintainerById(maintainerInsertedId);
    }
}
