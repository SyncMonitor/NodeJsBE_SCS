import { Entity } from "typeorm";
import { AmbientMeasurements } from "./interfaces/ambient-measurements.class";

@Entity()
export class Humidity extends AmbientMeasurements{

}