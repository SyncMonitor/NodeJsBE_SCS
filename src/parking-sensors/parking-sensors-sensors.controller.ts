import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { SensorsService } from "src/sensors/sensors.service";
import { ParkingSensorsService } from "./parking-sensors.service";
import { isEmpty } from "underscore";

@Controller('sensors/:id/parking-sensors')
export class ParkingSensorsSensorsController{
    constructor(
        private readonly parkingSensorsService: ParkingSensorsService,
        private readonly sensorsService: SensorsService,
    ){}

    @Get()
    async getAllParkingSensorsBySensorId(@Param('id') id: string){
        const parkingSensors = 
            await this.parkingSensorsService.getAllParkingSensorsBySensorId(id);
        
        if(!isEmpty(parkingSensors))
            return parkingSensors;
        else
            throw new HttpException('', HttpStatus.NOT_FOUND);
    }
}