import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSpotsController } from './parking-spots.controller';
import { ParkingSpotsService } from './parking-spots.service';

describe('ParkingSpotsController', () => {
  let parkingSpotsController: ParkingSpotsController;
  let parkingSpotsService: ParkingSpotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSpotsController],
      providers: [
        {
          provide: ParkingSpotsService,
          useValue: createMock<ParkingSpotsService>(),
        }
      ],
    }).compile();

    parkingSpotsController = 
      module.get<ParkingSpotsController>(ParkingSpotsController);
    parkingSpotsService = 
      module.get<ParkingSpotsService>(ParkingSpotsService);
  });

  it('should be defined', () => {
    expect(true).toBeTruthy();
  });
});
