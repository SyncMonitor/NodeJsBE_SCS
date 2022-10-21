import { Controller, Get, Param } from "@nestjs/common";
import { SensorsService } from "src/sensors/sensors.service";
import { ParkingSensorsService } from "./parking-sensors.service";

@Controller('sensors/:id/parking-sensors')
export class ParkingSensorsSensorsController{
    constructor(
        private readonly parkingSensorsService: ParkingSensorsService,
        private readonly sensorsService: SensorsService,
    ){}

    @Get()
    getAllParkingSensorsBySensorId(@Param('id') id: string){
        return this.parkingSensorsService.getAllParkingSensorsBySensorId(id);
    }
}