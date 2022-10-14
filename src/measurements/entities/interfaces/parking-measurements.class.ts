import { Column } from "typeorm";
import { Measurement } from "./measurement.class";

export class ParkingMeasurements extends Measurement{
    @Column()
    value: boolean;
}