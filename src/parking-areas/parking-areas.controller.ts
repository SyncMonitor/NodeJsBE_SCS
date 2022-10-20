import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ParkingArea } from './entities/parking-area.entity';
import { ParkingAreasService } from './parking-areas.service';
import { isEmpty } from 'underscore';
import { Response } from 'express'
import { QueryFailedError } from 'typeorm';

@Controller('parking-areas')
export class ParkingAreasController {
    constructor(private readonly parkingAreasService: 
        ParkingAreasService){}

    @Get()
    getAllParkingAreas(){
        return this.parkingAreasService.getAllParkingAreas();
    }

    @Get(':id')
    async getParkingAreaById(
            @Param('id') id: string,
            @Res({ passthrough: true }) res: Response
        ){
        const parkingArea: ParkingArea = await this.parkingAreasService.getParkingAreaById(id);

        if(!isEmpty(parkingArea))
            return parkingArea 
        else
            res.status(HttpStatus.NOT_FOUND).send()
    }

    @Post()
    async createParkingArea(@Body() parkingArea: ParkingArea){
        try{
            return await this.parkingAreasService.createParkingArea(parkingArea);
        }catch(error){
            if(error.code == 23505) throw new HttpException(error.message, HttpStatus.CONFLICT);
            else throw(error)
        }
    }
}
