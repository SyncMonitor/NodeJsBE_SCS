import { Injectable } from '@nestjs/common';
import { ParkingArea } from 'src/parking-areas/entities/parking-area.entity';
import { ParkingAreasService } from 'src/parking-areas/parking-areas.service';
import { ParkingSpot } from './entities/parking-spot.entity';
import { ParkingSpotsRepository } from './parking-spots.repository';
import { isEmpty } from 'underscore'
import { NotFoundError } from 'src/exceptions/not-found.exception';
import { UpdateError } from 'src/exceptions/update.exception';
import { DeleteError } from 'src/exceptions/delete.exception';

@Injectable()
export class ParkingSpotsService {

    constructor(
        private parkingSpotsRepository: ParkingSpotsRepository,
        private parkingAreasService: ParkingAreasService,
    ){}

    getAllParkingSpotsByParkingAreaId(id: string){
        return this.parkingSpotsRepository.find({
            relations: {
                parkingArea: true,
                sensors: true,
            },
            where: {
                parkingArea: {
                    id: id
                }
            }
        })
    }

    getParkingSpotById(id: string){
        return this.parkingSpotsRepository.findOne({
            where: {
                id: id,
            }
        })
    }

    getAllParkingSpotsBySensorId(id: string){
        return this.parkingSpotsRepository.find({
            relations: {
                sensors: false,
            },
            where: {
                sensors: {
                    id: id,
                }
            }
        })
    }

    createOrUpdateParkingSpots(parkingSpots: ParkingSpot[]){

        return this.parkingSpotsRepository.save(parkingSpots);
    }

    async createParkingSpotByParkingAreaId(id: string, parkingSpot: ParkingSpot){
        const parkingArea: ParkingArea =
            await this.parkingAreasService.getParkingAreaById(id);
        parkingSpot.parkingArea = parkingArea;
        
        if(isEmpty(parkingArea)) throw new NotFoundError('parking area id not found');

        const response = await this.parkingSpotsRepository.insert(parkingSpot);
        const parkingSpotInsertedId = response.identifiers[0].id;

        return this.getParkingSpotById(parkingSpotInsertedId);
    }

    async editParkingSpotById(id: string, parkingSpot: ParkingSpot){
        if(isEmpty(await this.getParkingSpotById(id)))
            throw new NotFoundError('parking spot id not found');

        const updateResponse = 
            await this.parkingSpotsRepository.update(id, parkingSpot);

        const numberRowAffected = updateResponse.affected;

        if(numberRowAffected !== 1)
            throw new UpdateError('problem to update record');

        return this.getParkingSpotById(id);
    }

    async deleteParkingSpotById(id: string){
        if(isEmpty(await this.getParkingSpotById(id)))
            throw new NotFoundError('parking spot id not found');

        const deleteResponse = 
            await this.parkingSpotsRepository.delete(id);
        
        const numberRowAffected = deleteResponse.affected;

        if(numberRowAffected !== 1)
            throw new DeleteError('problem to delete record');
    }
}
