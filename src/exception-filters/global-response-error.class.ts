import { IResponseError } from "./iresponseerror.interface";

export const GlobalResponseError: (statusCode: number, message: string, request: Request) => IResponseError = (
    statusCode: number,
    message: string,
    request: Request
): IResponseError => {
    return {
        statusCode: statusCode,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method
    };
};