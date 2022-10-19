import { Module } from '@nestjs/common';
import { TypeOrmExceptionFilter } from './typeorm.exception-filter';

@Module({
    providers: [
        //TypeOrmExceptionFilter
    ]
})
export class ExceptionFiltersModule {}
