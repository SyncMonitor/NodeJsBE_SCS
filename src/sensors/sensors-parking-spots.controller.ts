import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { SensorsService } from "./sensors.service";
import { isEmpty } from "underscore";

@Controller('parking-spots/:id/sensors')
export class SensorsParkingSpotsController{
    constructor(
        private readonly sensorsService: SensorsService
    ){}

    @Get()
    async getAllSensorsByParkingSpotId(@Param('id') id: string){
        const sensorsTest = [
            {
                'id': '1',
                'name': '156A2B71',
                'battery': '3,7V',
                'charge': '3',
                'type': 'ParkingSensor',
                'isActive': true,
                'lastSurvey': new Date(),
            },
            {
                'id': '2',
                'name': '156A2C72',
                'battery': '3,7V',
                'charge': '3',
                'type': 'ParkingSensor',
                'isActive': true,
                'lastSurvey': new Date(),
            }
        ];
        
        const sensors = 
            await this.sensorsService.getAllSensorsByParkingSpotId(id);

        if(!isEmpty(sensors))
            return sensors;
        else
            throw new HttpException('', HttpStatus.NOT_FOUND);
    }
}