import { Injectable } from '@nestjs/common';
import { ParkingArea } from './entities/parking-area.entity';
import { ParkingAreaRepository } from './parking-areas.repository';

@Injectable()
export class ParkingAreasService {

    constructor(
        private parkingAreaRepository: ParkingAreaRepository,
    ){}

    createOrUpdateParkingAreas(parkingAreas: ParkingArea[]){

        return this.parkingAreaRepository.save(parkingAreas);
    }
}
