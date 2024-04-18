import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { FiscalNaturezaOperacaoController } from "./crud.controller";
import { FiscalNaturezaOperacao } from "./crud.entity";
import { FiscalNaturezaOperacaoUser } from "./crud-user.entity";
import { FiscalNaturezaOperacaoUserController } from "./crud-user.controller";
import { FiscalNaturezaOperacaoService } from "./service";
import { FiscalNaturezaOperacaoUserService } from "./crud-user.service";
import { FiscalSerieModule } from "../fiscal-serie/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        FiscalSerieModule,
        
        TypeOrmModule.forFeature([FiscalNaturezaOperacao, FiscalNaturezaOperacaoUser]),
        BaseCrudModule
    ],
    controllers:[FiscalNaturezaOperacaoController, FiscalNaturezaOperacaoUserController],
    providers:[FiscalNaturezaOperacaoService, FiscalNaturezaOperacaoUserService],
    exports:[FiscalNaturezaOperacaoService, FiscalNaturezaOperacaoUserService]
})
export class FiscalNaturezaOperacaoModule {}