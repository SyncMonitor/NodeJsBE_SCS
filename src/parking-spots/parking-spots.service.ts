import { Injectable } from '@nestjs/common';
import { ParkingSpot } from './entities/parking-spot.entity';
import { ParkingSpotsRepository } from './parking-spots.repository';

@Injectable()
export class ParkingSpotsService {

    constructor(
        private parkingSpotsRepository: ParkingSpotsRepository,
    ){}

    createOrUpdateParkingSpots(parkingSpots: ParkingSpot[]){

        return this.parkingSpotsRepository.save(parkingSpots);
    }
}
