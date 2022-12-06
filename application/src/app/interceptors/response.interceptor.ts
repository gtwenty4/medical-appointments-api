import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP } from 'src/constants';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, 
    next: CallHandler
  ): Observable<any> {
    return next.handle().pipe(map(data => ({ 
      "apiVersion": APP.VERSION,
      "statusCode": context.getArgs()[1].statusCode,
      "timestamp": new Date().toISOString(),
      "data": {...data}
    })));
  }
}
