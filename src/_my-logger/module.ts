import { Module } from '@nestjs/common';
import { MyLoggerService } from './service';

@Module({
  providers: [MyLoggerService],
  exports: [MyLoggerService],
})
export class MyLoggerModule {}