import { Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Sensor } from './entities/sensor.entity';
import { SensorsService } from './sensors.service';
import { isEmpty } from 'underscore'

@Controller('sensors')
export class SensorsController {
    constructor(private readonly sensorsServices: 
        SensorsService){}

    @Get()
    getAllSensors(){
        return this.sensorsServices.getAllSensors();
    }

    @Get('sensors-maintenance')
    getAllSensorsWithSensorMaintenance(){
        return this.sensorsServices
            .getAllSensorsWithSensorMaintenance();
    }

    @Get(':id')
    async getSensorById(@Param('id') id: string){
        const sensor: Sensor = 
            await this.sensorsServices.getSensorById(id);
        
        if(!isEmpty(sensor))
            return sensor;
        else
            throw new HttpException('', HttpStatus.NOT_FOUND);
    }
}
