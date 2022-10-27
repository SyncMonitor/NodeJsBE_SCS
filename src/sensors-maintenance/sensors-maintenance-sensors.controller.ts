import { Body, Controller, Param, Put } from "@nestjs/common";
import { SensorMaintenance } from "./entities/sensor-maintenance.entity";
import { SensorsMaintenanceService } from "./sensors-maintenance.service";

@Controller('sensors/:id/sensors-maintenance')
export class SensorsMaintenanceSensorsController{
    constructor(
        private readonly sensorsMaintenanceService: SensorsMaintenanceService,
    ){}

    @Put()
    editSensorMaintenanceBySensorId(
        @Param('id') id: string,
        @Body() sensorMaintenance: SensorMaintenance,
    ){
        return this.sensorsMaintenanceService
            .editSensorMaintenanceBySensorId(id, sensorMaintenance);
    }
}