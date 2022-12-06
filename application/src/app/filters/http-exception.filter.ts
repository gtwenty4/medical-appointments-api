
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { APP } from 'src/constants';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(
    exception: HttpException, 
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let message: string | object | any = exception.getResponse();
    
    if(typeof(message) == "object") {
      message = message.message;
    }
    
    response
      .status(status)
      .json({
        "apiVersion": APP.VERSION,
        "statusCode": status,
        "timestamp": new Date().toISOString(),
        "error": {
          "statusCode": exception.getStatus(),
          "message": message
        }
      });
  }
}
