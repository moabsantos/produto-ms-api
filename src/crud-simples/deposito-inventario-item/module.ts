import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { DepositoInventarioItemController } from "./crud.controller";
import { DepositoInventarioItem } from "./crud.entity";
import { DepositoInventarioItemUser } from "./crud-user.entity";
import { DepositoInventarioItemUserController } from "./crud-user.controller";
import { DepositoInventarioItemService } from "./service";
import { DepositoInventarioItemUserService } from "./crud-user.service";
import { ProdutoModule } from "../produto/module";
import { UnidadeMedidaModule } from "../unidade-medida/module";
import { EmpresaModule } from "../empresa/module";
import { DepositoModule } from "../deposito/module";
import { ProdutoGrupoModule } from "../produto-grupo/module";
import { DepositoSaldoModule } from "../deposito-saldo/module";
import { DepositoInventarioModule } from "../deposito-inventario/module";
import { DepositoRequisicaoModule } from "../deposito-requisicao/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        EmpresaModule,
        ProdutoModule,
        ProdutoGrupoModule,
        UnidadeMedidaModule,
        DepositoModule,
        DepositoSaldoModule,
        DepositoInventarioModule,
        DepositoRequisicaoModule,

        TypeOrmModule.forFeature([DepositoInventarioItem, DepositoInventarioItemUser]),
        BaseCrudModule
    ],
    controllers:[DepositoInventarioItemController, DepositoInventarioItemUserController],
    providers:[DepositoInventarioItemService, DepositoInventarioItemUserService],
    exports:[DepositoInventarioItemService, DepositoInventarioItemUserService]
})
export class DepositoInventarioItemModule {}