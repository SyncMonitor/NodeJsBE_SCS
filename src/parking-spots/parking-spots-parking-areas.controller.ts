import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ParkingArea } from "src/parking-areas/entities/parking-area.entity";
import { ParkingAreasService } from "src/parking-areas/parking-areas.service";
import { ParkingSpotsService } from "./parking-spots.service";
import { isEmpty } from "underscore"
import { ParkingSpot } from "./entities/parking-spot.entity";
import { NotFoundError } from "src/exceptions/not-found.exception";

// TODO: figure out if is better to put this handlers in the ParkingAreasController
//       instead of creating this separate ParkingSpotsParkingAreasController
@Controller('parking-areas/:id/parking-spots')
export class ParkingSpotsParkingAreasController{
    constructor(
            private readonly parkingSpotsService: ParkingSpotsService,
            private readonly parkingAreasService: ParkingAreasService,
        ){}

    @Get()
    async getAllParkingSpotsByParkingAreaId(@Param('id') id: string){
        
        const parkingSpots = 
            await this.parkingSpotsService.getAllParkingSpotsByParkingAreaId(id);

        if(!isEmpty(parkingSpots))
            return parkingSpots;
        else
            throw new HttpException('', HttpStatus.NOT_FOUND)
    }

    @Post()
    async createParkingSpotByParkingAreaId(
            @Param('id') id: string,
            @Body() parkingSpot: ParkingSpot,
        ){
        try{
            return await this.parkingSpotsService
                .createParkingSpotByParkingAreaId(id, parkingSpot);
        }catch(error){
            if(error instanceof NotFoundError)
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            if(error.code == 23505)
                throw new HttpException(error.message, HttpStatus.CONFLICT);
            throw(error)
        }
    }
}