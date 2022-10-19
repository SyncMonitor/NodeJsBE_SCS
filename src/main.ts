import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeOrmExceptionFilter } from './exception-filters/typeorm.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('scs');
  app.useGlobalFilters(new TypeOrmExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))
  await app.listen(3000);
}
bootstrap();
