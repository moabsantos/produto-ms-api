import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { CentroFinanceiroController } from "./crud.controller";
import { CentroFinanceiro } from "./crud.entity";
import { CentroFinanceiroUser } from "./crud-user.entity";
import { CentroFinanceiroUserController } from "./crud-user.controller";
import { CentroFinanceiroService } from "./service";
import { CentroFinanceiroUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([CentroFinanceiro, CentroFinanceiroUser]),
        BaseCrudModule
    ],
    controllers:[CentroFinanceiroController, CentroFinanceiroUserController],
    providers:[CentroFinanceiroService, CentroFinanceiroUserService],
    exports:[CentroFinanceiroService, CentroFinanceiroUserService]
})
export class CentroFinanceiroModule {}