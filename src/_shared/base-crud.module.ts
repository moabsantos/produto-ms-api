import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BaseCrudService } from './base-crud.service';
import { BaseCrudUserService } from './base-crud-user.service';
import { BaseModelCrud } from './base-model-crud.entity';
import { BaseModelUser } from './base-model-user';


@Module({
  imports: [TypeOrmModule.forFeature([BaseModelCrud, BaseModelUser]),],
  providers:[BaseCrudService, BaseCrudUserService],
  exports:[BaseCrudService, BaseCrudUserService]
})
export class BaseCrudModule {}