import { Injectable } from '@nestjs/common';
import { AppServiceOptions } from './app.service.options';

@Injectable()
export class AppService {
  constructor(private readonly options: AppServiceOptions) {}
  getHello(): string {
    return this.options.helloWorld;
  }
}
