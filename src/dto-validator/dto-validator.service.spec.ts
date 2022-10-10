import { Test, TestingModule } from '@nestjs/testing';
import { DtoValidatorService } from './dto-validator.service';

describe('DtoValidatorService', () => {
  let dtoValidatorService: DtoValidatorService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [DtoValidatorService],
    }).compile();

    dtoValidatorService = module.get<DtoValidatorService>(DtoValidatorService);
  });

  describe('checkDtoConsistency', () => {
    it('dto and object should have same attributes', () => {
        const objDto = {
            name: 'Tom',
            age: 12,
            job: 'police man',
        }

        const obj1 = {
            name: 'Jhon',
            age: 24,
            job: 'doctor',
        }

        const obj2 = {
            name: 'Betty',
            age: 55,
        }

        const obj3 = {
            name: 'Jhon',
            age: 24,
            secondJob: 'doctor',
        }

        expect(dtoValidatorService.checkDtoConsistency(objDto, obj1)).toBeTruthy()
        expect(dtoValidatorService.checkDtoConsistency(objDto, obj2)).toBeFalsy()
        expect(dtoValidatorService.checkDtoConsistency(objDto, obj3)).toBeFalsy()
    })
  })

  describe('checkDtoConsistencyArray', () => {
      it('dto and objects of an array should have same attributes', () => {
          const objDto = {
              name: 'Tom',
              age: 12,
              job: 'police man',
          }

          const obj1 = {
              name: 'Jhon',
              age: 24,
              job: 'doctor',
          }

          const obj2 = {
              name: 'Betty',
              age: 55,
          }

          const obj3 = {
              name: 'Jhon',
              age: 24,
              secondJob: 'doctor',
          }

          const objectsArray1 = [ obj1 ];
          const objectsArray2 = [ obj1, obj2 ];
          const objectsArray3 = [ obj1, obj3 ];

          expect(dtoValidatorService.checkDtoConsistencyArray(objDto, objectsArray1)).toBeTruthy()
          expect(dtoValidatorService.checkDtoConsistencyArray(objDto, objectsArray2)).toBeFalsy()
          expect(dtoValidatorService.checkDtoConsistencyArray(objDto, objectsArray3)).toBeFalsy()
      })
  })
});
