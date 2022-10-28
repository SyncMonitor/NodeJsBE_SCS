import { Injectable } from '@nestjs/common';
import { MaintainerRegistry } from './entities/maintainer-registry.entity';
import { MaintainersRegistryRepository } from './maintainers-registry.repository';
import { isEmpty } from 'underscore';
import { NotFoundError } from 'src/exceptions/not-found.exception';
import { UpdateError } from 'src/exceptions/update.exception';
import { DeleteError } from 'src/exceptions/delete.exception';

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

    async editMaintainerById(id: string, maintainerRegistry: MaintainerRegistry){
        if(isEmpty(await this.getMaintainerById(id)))
            throw new NotFoundError('maintainer id not found');
        
        const updateResponse = 
            await this.maintainersRegistryRepository.update(id, maintainerRegistry);

        const numberRowAffected = updateResponse.affected;

        if(numberRowAffected !== 1)
            throw new UpdateError('problem to update record');

        return this.getMaintainerById(id);
    }

    async deleteMaintainerById(id: string){
        if(isEmpty(await this.getMaintainerById(id)))
            throw new NotFoundError('maintainer id not found');

        const deleteResponse = 
            await this.maintainersRegistryRepository.delete(id);

        const numberRowAffected = deleteResponse.affected;

        if(numberRowAffected !== 1)
            throw new DeleteError('problem to delete record');
    }
}
