import { Injectable, NestMiddleware, Inject } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { LoggerFile } from "src/logger-file/logger-file.service";
import { Logger } from "winston";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
      private readonly logger: Logger
  ){}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl: url } = request;
    const userAgent = request.get('user-agent') || '';
    const body = JSON.stringify(request.body);

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.info(
        `${method} ${url} ${body} ${statusCode} ${contentLength} - ${userAgent} ${ip}`
      );
    });

    next();
  }
}