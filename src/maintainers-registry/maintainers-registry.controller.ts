import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { MaintainerRegistry } from './entities/maintainer-registry.entity';
import { MaintainersRegistryService } from './maintainers-registry.service';
import { isEmpty } from 'underscore'

@Controller('maintainer')
export class MaintainersRegistryController {
    constructor(private readonly maintainersRegistryService: 
        MaintainersRegistryService){}

    @Get()
    getAllMaintainers(){
        return this.maintainersRegistryService.getAllMaintainers()
    }

    @Get(':id')
    async getMaintainerById(@Param('id') id: string){
        const maintainer: MaintainerRegistry = 
            await this.maintainersRegistryService.getMaintainerById(id);

        if(!isEmpty(maintainer))
            return maintainer;
        else
            throw new HttpException('', HttpStatus.NOT_FOUND);
    }

    @Post()
    async createMaintainer(@Body() maintainer: MaintainerRegistry){
        try{
            return await this.maintainersRegistryService.createMaintainer(maintainer)
        }catch(error){
            if(error.code == 23505) 
                throw new HttpException(error.message, HttpStatus.CONFLICT)
            throw(error);
        }
    }
}
