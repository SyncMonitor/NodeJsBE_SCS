import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ParkingArea } from './entities/parking-area.entity';
import { ParkingAreasService } from './parking-areas.service';
import { isEmpty } from 'underscore';

@Controller('parking-areas')
export class ParkingAreasController {
    constructor(
            private readonly parkingAreasService: ParkingAreasService,
        ){}

    @Get()
    getAllParkingAreas(){
        return this.parkingAreasService.getAllParkingAreas();
    }

    @Get(':id')
    async getParkingAreaById(@Param('id') id: string){
        const parkingArea: ParkingArea = await this.parkingAreasService.getParkingAreaById(id);

        if(!isEmpty(parkingArea))
            return parkingArea 
        else
            throw new HttpException('', HttpStatus.NOT_FOUND);
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

    @Put(':id')
    editParkingAreaById(
        @Param('id') id: string,
        @Body() parkingArea: ParkingArea,
    ){
        return this.parkingAreasService
            .editParkingAreaById(id, parkingArea);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteParkingAreaById(@Param('id') id: string){
        return this.parkingAreasService
            .deleteParkingAreaById(id);
    }
}
