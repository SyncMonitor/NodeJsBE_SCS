import { Injectable } from '@nestjs/common';
import { ParkingArea } from './entities/parking-area.entity';
import { ParkingAreasRepository } from './parking-areas.repository';

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
}
