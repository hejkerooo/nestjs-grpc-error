
import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { CustomException } from './custom.exception';

@Catch(CustomException)
export class ExceptionFilter implements RpcExceptionFilter<CustomException> {
  catch(exception: CustomException, host: ArgumentsHost): Observable<any> {
    return throwError(new RpcException({
      message: 'test',
      code: 5,
    }));
  }
}

/*
  `code` is not being passed further (to the client)
  every call ends up with error code 2 (UNKNOWN)
  message is passed correctly

  sample response:
  {
    "error": "2 UNKNOWN: test"
  }
 */