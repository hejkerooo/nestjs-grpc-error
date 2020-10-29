import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Controller, UseFilters } from '@nestjs/common';
import { ExceptionFilter } from './heroes.exception-filter';
import { CustomException } from './custom.exception';

class HeroById {
  public id: number;
}

class Hero {
  public id: number;
  public name: string;
}

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