import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsModule } from './sensors/sensors.module';
import { ParkingAreasModule } from './parking-areas/parking-areas.module';
import { SensorsMaintainersModule } from './sensors-maintainers/sensors-maintainers.module';
import { MaintainersRegistryModule } from './maintainers-registry/maintainers-registry.module';
import { SensorsScrapingModule } from './sensors-scraping/sensors-scraping.module';
import { DtoValidatorModule } from './dto-validator/dto-validator.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: ( configService: ConfigService ) => ({
        type: 'postgres' as 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DATABASE'),
        entities: [],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ ConfigService ],
    }),
    SensorsModule,
    ParkingAreasModule,
    SensorsMaintainersModule,
    MaintainersRegistryModule,
    SensorsScrapingModule,
    DtoValidatorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
