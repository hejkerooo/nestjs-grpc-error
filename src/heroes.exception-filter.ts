
import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { CustomException } from './custom.exception';

@Catch(CustomException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    return throwError(new RpcException({
      message: 'test',
      code: 5,
    }));
  }
}

/*
  `code` is not being passed further
  every call ends up with error code 2 (UNKNOWN)

  however if you edit heroes.controller to look like this:

  @UseFilters(ExceptionFilter)
  @Controller()
  export class HeroesController {
    @GrpcMethod('HeroesService', 'FindOne')
    findOne(data: HeroById, metadata: any): Hero {

      throw new RpcException({
        code: 11,
        message: 'test'
      })
      // throw new CustomException();
    }
  }

  `code` will be sent to the client (in that case OUT_OF_RANGE because code is 11)
 */