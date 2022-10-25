import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { ParkingSpotsService } from "./parking-spots.service";
import { isEmpty } from 'underscore'
import { SensorsService } from "src/sensors/sensors.service";

@Controller('sensors/:id/parking-spots')
export class ParkingSpotsSensorsController{
    constructor(
        private readonly parkingSpotsService: ParkingSpotsService,
        private readonly sensorsService: SensorsService,
    ){}

    @Get()
    async getAllParkingSpotsBySensorId(@Param('id') id: string){
        const sensor = await this.sensorsService.getSensorById(id);
        
        if(isEmpty(sensor)) 
            throw new HttpException('', HttpStatus.NOT_FOUND);

        const parkingSpots =
            await this.parkingSpotsService.getAllParkingSpotsBySensorId(id);

        return parkingSpots;
    }
}