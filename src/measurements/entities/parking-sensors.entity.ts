import { Entity } from "typeorm";
import { ParkingMeasurements } from "./interfaces/parking-measurements.class";

@Entity()
export class ParkingSensors extends ParkingMeasurements{

}