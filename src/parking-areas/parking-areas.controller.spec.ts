import { createMock } from '@golevelup/ts-jest';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { response, Response } from 'express';
import { ParkingAreasController } from './parking-areas.controller';
import { ParkingAreasService } from './parking-areas.service';

describe('ParkingAreasController', () => {
  let parkingAreasController: ParkingAreasController;
  let parkingAreasService: ParkingAreasService;
  let parkingArea;

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

  parkingArea = {
    id: '1',
    address: 'Via Forcellini',
    latitude: '47.390018',
    longitude: '47.392978',
  }

  describe('getParkingAreaById', () => {
    it('should response with the parking area if parking area id is found', async () => {
      jest.spyOn(parkingAreasService, 'getParkingAreaById')
      .mockImplementation(() => Promise.resolve(parkingArea));

      const response = parkingAreasController.getParkingAreaById('1');

      await expect(response).resolves.toEqual(parkingArea);
    })

    it('should throw an HttpException if parking area was not found', async () => {
      jest.spyOn(parkingAreasService, 'getParkingAreaById')
      .mockImplementation(() => Promise.resolve(null));

      const response = parkingAreasController.getParkingAreaById('1');

      await expect(response).rejects.toThrow(HttpException);
    })
  });

  describe('createParkingArea', () => {
    it('should return the created parking area if it was created', async () => {
      jest.spyOn(parkingAreasService, 'createParkingArea')
      .mockImplementation(() => Promise.resolve(parkingArea));

      const response = parkingAreasController.createParkingArea(parkingArea);

      await expect(response).resolves.toEqual(parkingArea);
    })

    it('should throw an error if the parking area was not created', async () => {
      jest.spyOn(parkingAreasService, 'createParkingArea')
        .mockImplementation(() => Promise.reject(new Error('database error')));

      const handlerResponse = parkingAreasController.createParkingArea(parkingArea);

      await expect(handlerResponse).rejects.toThrow(Error);
    })
  });

});
