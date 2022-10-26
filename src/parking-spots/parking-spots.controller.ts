import { Body, Controller, Param, Put } from '@nestjs/common';
import { ParkingSpot } from './entities/parking-spot.entity';
import { ParkingSpotsService } from './parking-spots.service';

@Controller('parking-spots')
export class ParkingSpotsController {
    constructor(
        private readonly parkingSpotsService: ParkingSpotsService
    ){}

    @Put(':id')
    editParkingSpotById(
        @Param('id') id: string,
        @Body() parkingSpot: ParkingSpot,
    ){
        return this.parkingSpotsService
            .editParkingSpotById(id, parkingSpot);
    }
}
