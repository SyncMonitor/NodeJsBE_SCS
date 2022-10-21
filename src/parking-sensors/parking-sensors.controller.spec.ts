import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSensorsController } from './parking-sensors.controller';

describe('ParkingSensorsController', () => {
  let controller: ParkingSensorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSensorsController],
    }).compile();

    controller = module.get<ParkingSensorsController>(ParkingSensorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
