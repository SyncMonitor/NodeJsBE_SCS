import { Column } from "typeorm";
import { Measurement } from "./measurement.class";

export class AmbientMeasurements extends Measurement{
    @Column()
    value: string;
}