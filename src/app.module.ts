import { Module } from '@nestjs/common';
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
      }),
      inject: [ ConfigService ],
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
