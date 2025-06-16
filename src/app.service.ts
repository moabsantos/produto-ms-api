import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const dataAgora = new Date()
    const statusOk = `api up ${dataAgora}`
    console.log(statusOk)
    return statusOk;
  }
}
