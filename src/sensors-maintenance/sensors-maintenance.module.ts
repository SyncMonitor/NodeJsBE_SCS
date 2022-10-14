import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorMaintenance } from './entities/sensor-maintenance.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ SensorMaintenance ]),
    ],
})
export class SensorsMaintenanceModule {}
