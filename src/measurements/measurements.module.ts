import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloatSensor } from './entities/float-sensor.entity';
import { Humidity } from './entities/humidity.entity';
import { Measurement } from './entities/interfaces/measurement.class';
import { ParkingSensor } from './entities/parking-sensor.entity';
import { ParticularMatter10 } from './entities/particular-matter10.entity';
import { ParticularMatter25 } from './entities/particular-matter25.entity';
import { Temperature } from './entities/temperature.entity';

@Module({
    imports: [
            TypeOrmModule.forFeature([
            ParkingSensor,
            Temperature,
            ParticularMatter10,
            ParticularMatter25,
            Humidity,
            FloatSensor,
        ])
    ],
    providers: [],
    exports: [
    ]
})
export class MeasurementsModule {}
