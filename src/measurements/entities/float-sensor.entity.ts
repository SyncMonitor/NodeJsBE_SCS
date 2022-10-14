import { Entity } from "typeorm";
import { AmbientMeasurements } from "./interfaces/ambient-measurements.class";

@Entity({ name: 'float_sensors' })
export class FloatSensor extends AmbientMeasurements{

}