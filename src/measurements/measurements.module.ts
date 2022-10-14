import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloatSensors } from './entities/float-sensors.entity';
import { Humidity } from './entities/humidity.entity';
import { ParkingSensors } from './entities/parking-sensors.entity';
import { ParticularMatter10 } from './entities/particular-matter10.entity';
import { ParticularMatter25 } from './entities/particular-matter25.entity';
import { Temperature } from './entities/temperature.entity';

@Module({
    imports: [
            TypeOrmModule.forFeature([
            ParkingSensors,
            Temperature,
            ParticularMatter10,
            ParticularMatter25,
            Humidity,
            FloatSensors,
        ])
    ]
})
export class MeasurementsModule {}
