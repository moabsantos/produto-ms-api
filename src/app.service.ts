import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const statusOk = 'api up'
    console.log(statusOk)
    return 'Hello World!';
  }
}
