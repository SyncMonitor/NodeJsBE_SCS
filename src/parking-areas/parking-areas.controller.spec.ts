import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { response, Response } from 'express';
import { ParkingAreasController } from './parking-areas.controller';
import { ParkingAreasService } from './parking-areas.service';
import { isEmpty } from 'underscore';
import  * as httpMocks  from 'node-mocks-http'
import { QueryFailedError } from 'typeorm';

describe('ParkingAreasController', () => {
  let parkingAreasController: ParkingAreasController;
  let parkingAreasService: ParkingAreasService;
  let parkingAreaResponse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingAreasController],
      providers: [
        {
          provide: ParkingAreasService,
          useValue: createMock<ParkingAreasService>()
        }
      ]
    }).compile();

    parkingAreasController = module.get<ParkingAreasController>(ParkingAreasController);
    parkingAreasService = module.get<ParkingAreasService>(ParkingAreasService);
  });

  parkingAreaResponse = {
    id: '1',
    address: 'Via Forcellini',
    latitude: '47.390018',
    longitude: '47.392978',
  }

  describe('getParkingAreaById', () => {
    it('should response with the parking area if parking area id is found', async () => {
      const response = httpMocks.createResponse();
      jest.spyOn(parkingAreasService, 'getParkingAreaById').mockImplementation(
        () => Promise.resolve(parkingAreaResponse));

      const handlerResponse = parkingAreasController.getParkingAreaById('1', response);

      await expect(handlerResponse).resolves.toEqual(parkingAreaResponse);
    })
  });

  describe('createParkingArea', () => {
    it('should return the created parking area if it was created', async () => {
      jest.spyOn(parkingAreasService, 'createParkingArea').mockImplementation(
        () => Promise.resolve(parkingAreaResponse)
      );

      const handlerResponse = parkingAreasController.createParkingArea(parkingAreaResponse);

      await expect(handlerResponse).resolves.toEqual(parkingAreaResponse);
    })

    it('should throw an error if the parking area was not created', async () => {
      jest.spyOn(parkingAreasService, 'createParkingArea').mockImplementation(
        () => Promise.reject(new Error('database error'))
      );

      const handlerResponse = parkingAreasController.createParkingArea(parkingAreaResponse);

      await expect(handlerResponse).rejects.toThrow(Error);
    })
  });

});
