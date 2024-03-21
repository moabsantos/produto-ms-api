import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { DespesaFinanceiraController } from "./crud.controller";
import { DespesaFinanceira } from "./crud.entity";
import { DespesaFinanceiraUser } from "./crud-user.entity";
import { DespesaFinanceiraUserController } from "./crud-user.controller";
import { DespesaFinanceiraService } from "./service";
import { DespesaFinanceiraUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([DespesaFinanceira, DespesaFinanceiraUser]),
        BaseCrudModule
    ],
    controllers:[DespesaFinanceiraController, DespesaFinanceiraUserController],
    providers:[DespesaFinanceiraService, DespesaFinanceiraUserService],
    exports:[DespesaFinanceiraService, DespesaFinanceiraUserService]
})
export class DespesaFinanceiraModule {}