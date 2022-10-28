import { ConsoleLogger, Injectable } from "@nestjs/common";

@Injectable()
export class LoggerFile extends ConsoleLogger{
    log(message: any): void{
        super.log(message);
    }
}