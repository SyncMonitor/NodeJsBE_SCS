import { Module } from '@nestjs/common';
import { DtoValidatorService } from './dto-validator.service';

@Module({
  providers: [DtoValidatorService],
  exports: [ DtoValidatorService ]
})
export class DtoValidatorModule {}
