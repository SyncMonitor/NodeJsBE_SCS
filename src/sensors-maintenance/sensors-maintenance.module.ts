import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorMaintenance } from './entities/sensor-maintenance.entity';
import { SensorsMaintenanceRepository } from './sensors-maintenance.registry';
import { SensorsMaintenanceService } from './sensors-maintenance.service';
import { SensorsMaintenanceController } from './sensors-maintenance.controller';
import { SensorsMaintenanceSensorsController } from './sensors-maintenance-sensors.controller';
import { SensorsModule } from 'src/sensors/sensors.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ SensorMaintenance ]),
        SensorsModule,
    ],
    controllers: [
        SensorsMaintenanceController,
        SensorsMaintenanceSensorsController,
    ],
    providers: [
        SensorsMaintenanceService,
        SensorsMaintenanceRepository,
    ],
    exports: [
        SensorsMaintenanceService,
    ],
})
export class SensorsMaintenanceModule {}
