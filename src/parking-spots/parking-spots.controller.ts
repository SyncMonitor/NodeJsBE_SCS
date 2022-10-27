import { Body, Controller, Delete, HttpCode, Param, Put } from '@nestjs/common';
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

    @Delete(':id')
    @HttpCode(204)
    deleteParkingSpotById(@Param('id') id: string){
        return this.parkingSpotsService
            .deleteParkingSpotById(id);
    }
}
