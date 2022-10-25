import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { SensorsService } from "./sensors.service";
import { isEmpty } from "underscore";
import { ParkingSpotsService } from "src/parking-spots/parking-spots.service";

@Controller('parking-spots/:id/sensors')
export class SensorsParkingSpotsController{
    constructor(
        private readonly sensorsService: SensorsService,
        private readonly parkingSpotsService: ParkingSpotsService,
    ){}

    @Get()
    async getAllSensorsByParkingSpotId(@Param('id') id: string){
        const parkingSpot = 
            await this.parkingSpotsService.getParkingSpotById(id);
        
        if(isEmpty(parkingSpot))
            throw new HttpException('', HttpStatus.NOT_FOUND);

        const sensors = 
            await this.sensorsService.getAllSensorsByParkingSpotId(id);

        return sensors;
    }
}