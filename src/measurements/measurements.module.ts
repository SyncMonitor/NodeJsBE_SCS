import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloatSensor } from './entities/float-sensor.entity';
import { Humidity } from './entities/humidity.entity';
import { ParticularMatter10 } from './entities/particular-matter10.entity';
import { ParticularMatter25 } from './entities/particular-matter25.entity';
import { Temperature } from './entities/temperature.entity';
import { MeasurementsService } from './measurements.service';

@Module({
    imports: [
            TypeOrmModule.forFeature([
            Temperature,
            ParticularMatter10,
            ParticularMatter25,
            Humidity,
            FloatSensor,
        ])
    ],
    providers: [
        MeasurementsService,
    ],
    exports: [
        MeasurementsService
    ]
})
export class MeasurementsModule {}
