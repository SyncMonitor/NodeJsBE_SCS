import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError } from "typeorm";
import { Response } from 'express'
import { GlobalResponseError } from "./global-response-error.class";
import { NotFoundError } from "src/exceptions/not-found.exception";

@Catch()
export class TypeOrmExceptionFilter implements ExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let message = (exception as any).message;
        let code = 'HttpException';

        Logger.error(message, (exception as any).stack, `${request.method} ${request.url}`);

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        
        switch (exception.constructor) {
            case HttpException:
                status = (exception as HttpException).getStatus();
                break;
            case BadRequestException:
                status = (exception as BadRequestException).getStatus();
                message = ((exception as BadRequestException).getResponse() as {message: string[]}).message.toString();
                code = (exception as any).code;
                break;
            case QueryFailedError:  // this is a TypeOrm error
                code = (exception as any).code;
                
                switch(code){
                    case '23505':
                        status = HttpStatus.CONFLICT;
                        message = 'database error on unique constraint';
                        break;
                    default:
                        status = HttpStatus.UNPROCESSABLE_ENTITY
                        message = (exception as QueryFailedError).message;
                }
                break;
            case EntityNotFoundError:  // this is another TypeOrm error
                status = HttpStatus.UNPROCESSABLE_ENTITY
                message = (exception as EntityNotFoundError).message;
                code = (exception as any).code;
                break;
            case CannotCreateEntityIdMapError: // and another
                status = HttpStatus.UNPROCESSABLE_ENTITY
                message = (exception as CannotCreateEntityIdMapError).message;
                code = (exception as any).code;
                break;
            case NotFoundError: // custom error
                status = HttpStatus.NOT_FOUND;
                message = (exception as NotFoundError).message;
                code = (exception as any).code;
                break;
            default:
                status = HttpStatus.INTERNAL_SERVER_ERROR
        }

        response.status(status).json(GlobalResponseError(status, message, request));
    }
}