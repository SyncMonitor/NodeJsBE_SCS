import { Injectable } from '@nestjs/common';
import { UpdateError } from 'src/exceptions/update.exception';
import { ParkingArea } from './entities/parking-area.entity';
import { ParkingAreasRepository } from './parking-areas.repository';
import { isEmpty } from 'underscore';
import { NotFoundError } from 'src/exceptions/not-found.exception';
import { DeleteError } from 'src/exceptions/delete.exception';

@Injectable()
export class ParkingAreasService {
    constructor(private readonly parkingAreasRepository: 
        ParkingAreasRepository){}

    getAllParkingAreas(){
        return this.parkingAreasRepository.find();
    }

    public getParkingAreaById(id: string){
        return this.parkingAreasRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async createParkingArea(parkingArea: ParkingArea){  
        const response = await this.parkingAreasRepository.insert(parkingArea);
        const parkingAreaInsertedId = response.identifiers[0].id;

        return this.getParkingAreaById(parkingAreaInsertedId);
    }

    async editParkingAreaById(id: string, parkingArea: ParkingArea){
        if(isEmpty(await this.getParkingAreaById(id)))
            throw new NotFoundError('parking area id not found');

        const updateResponse = await this.parkingAreasRepository
            .update(id, parkingArea);

        const numberRowAffected = updateResponse.affected;
        
        if(numberRowAffected !== 1) 
            throw new UpdateError('problem to update record');

        return this.getParkingAreaById(id);
    }

    async deleteParkingAreaById(id: string){
        if(isEmpty(await this.getParkingAreaById(id)))
            throw new NotFoundError('parking area id not found');

        const deleteResponse = 
            await this.parkingAreasRepository.delete(id);

        const numberRowAffected = deleteResponse.affected;

        if(numberRowAffected !== 1)
            throw new DeleteError('problem to update record');
    }
}
