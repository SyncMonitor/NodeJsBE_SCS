import { Module } from '@nestjs/common';
import { LoggerFile } from './logger-file.service';

@Module({
    providers: [
        LoggerFile,
    ],
    exports: [
        LoggerFile,
    ]
})
export class LoggerFileModule {}
