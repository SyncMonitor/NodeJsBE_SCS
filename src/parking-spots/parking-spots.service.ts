import { Injectable } from '@nestjs/common';
import { ParkingArea } from 'src/parking-areas/entities/parking-area.entity';
import { ParkingAreasService } from 'src/parking-areas/parking-areas.service';
import { ParkingSpot } from './entities/parking-spot.entity';
import { ParkingSpotsRepository } from './parking-spots.repository';
import { isEmpty } from 'underscore'
import { NotFoundError } from 'src/exceptions/not-found.exception';

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
        return this.parkingSpotsRepository.find({
            relations: {
                parkingArea: true,
                sensors: true,
            },
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
}
