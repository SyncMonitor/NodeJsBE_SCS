import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsModule } from './sensors/sensors.module';
import { ParkingSpotsModule } from './parking-spots/parking-spots.module';
import { MaintainersRegistryModule } from './maintainers-registry/maintainers-registry.module';
import { SensorsScrapingModule } from './sensors-scraping/sensors-scraping.module';
import { DtoValidatorModule } from './dto-validator/dto-validator.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AutomapperCustomModule } from './automapper-custom/automapper-custom.module';
import { SensorsMaintenanceModule } from './sensors-maintenance/sensors-maintenance.module';
import { ParkingAreasModule } from './parking-areas/parking-areas.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { ParkingSensorsModule } from './parking-sensors/parking-sensors.module';
import { LoggerFileModule } from './logger-file/logger-file.module';
import { SensorSubscriber } from './sensors/entities/sensor.subscriber';
import { ParkingSensorSubscriber } from './parking-sensors/entities/parking-sensor.subscriber';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmExceptionFilter } from './exception-filters/typeorm.exception-filter';
import { ExceptionFiltersModule } from './exception-filters/exception-filters.module';
import { ExceptionsModule } from './exceptions/exceptions.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
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
        subscribers: [
          SensorSubscriber,
          ParkingSensorSubscriber,
        ],
      }),
      inject: [ ConfigService ],
    }),
    WinstonModule.forRoot({
      level: 'info',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Nest', {
              colors: true,
              prettyPrint: true,
            })
          )
        }),
        new winston.transports.File({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
          filename: 'logs/NodeJsBE_SCS.log',
          level: 'info'
        })
      ]
    }),
    SensorsModule,
    ParkingSpotsModule,
    SensorsMaintenanceModule,
    MaintainersRegistryModule,
    SensorsScrapingModule,
    DtoValidatorModule,
    AutomapperModule,
    AutomapperCustomModule,
    ParkingAreasModule,
    MeasurementsModule,
    ParkingSensorsModule,
    LoggerFileModule,
    ExceptionFiltersModule,
    ExceptionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
