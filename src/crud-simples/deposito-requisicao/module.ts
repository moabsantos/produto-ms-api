import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { DepositoRequisicaoController } from "./crud.controller";
import { DepositoRequisicao } from "./crud.entity";
import { DepositoRequisicaoUser } from "./crud-user.entity";
import { DepositoRequisicaoUserController } from "./crud-user.controller";
import { DepositoRequisicaoService } from "./service";
import { DepositoRequisicaoUserService } from "./crud-user.service";
import { DepositoSaldoModule } from "../deposito-saldo/module";
import { ProdutoModule } from "../produto/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        ProdutoModule,
        DepositoSaldoModule,
        
        TypeOrmModule.forFeature([DepositoRequisicao, DepositoRequisicaoUser]),
        BaseCrudModule
    ],
    controllers:[DepositoRequisicaoController, DepositoRequisicaoUserController],
    providers:[DepositoRequisicaoService, DepositoRequisicaoUserService],
    exports:[DepositoRequisicaoService, DepositoRequisicaoUserService]
})
export class DepositoRequisicaoModule {}