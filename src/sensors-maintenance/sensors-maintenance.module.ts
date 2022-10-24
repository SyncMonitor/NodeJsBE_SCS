import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorMaintenance } from './entities/sensor-maintenance.entity';
import { SensorsMaintenanceRepository } from './sensors-maintenance.registry';
import { SensorsMaintenanceService } from './sensors-maintenance.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ SensorMaintenance ]),
    ],
    providers: [
        SensorsMaintenanceService,
        SensorsMaintenanceRepository,
    ],
    exports: [
        SensorsMaintenanceService,
    ]
})
export class SensorsMaintenanceModule {}
