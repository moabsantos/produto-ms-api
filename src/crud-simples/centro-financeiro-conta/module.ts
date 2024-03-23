import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { CentroFinanceiroContaController } from "./crud.controller";
import { CentroFinanceiroConta } from "./crud.entity";
import { CentroFinanceiroContaUser } from "./crud-user.entity";
import { CentroFinanceiroContaUserController } from "./crud-user.controller";
import { CentroFinanceiroContaService } from "./service";
import { CentroFinanceiroContaUserService } from "./crud-user.service";
import { CentroFinanceiroModule } from "../centro-financeiro/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        CentroFinanceiroModule,
        
        TypeOrmModule.forFeature([CentroFinanceiroConta, CentroFinanceiroContaUser]),
        BaseCrudModule
    ],
    controllers:[CentroFinanceiroContaController, CentroFinanceiroContaUserController],
    providers:[CentroFinanceiroContaService, CentroFinanceiroContaUserService],
    exports:[CentroFinanceiroContaService, CentroFinanceiroContaUserService]
})
export class CentroFinanceiroContaModule {}