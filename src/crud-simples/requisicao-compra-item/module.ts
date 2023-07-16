import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { RequisicaoCompraItemController } from "./crud.controller";
import { RequisicaoCompraItem } from "./crud.entity";
import { RequisicaoCompraItemUser } from "./crud-user.entity";
import { RequisicaoCompraItemUserController } from "./crud-user.controller";
import { RequisicaoCompraItemService } from "./service";
import { RequisicaoCompraItemUserService } from "./crud-user.service";
import { ProdutoModule } from "../produto/module";
import { UnidadeMedidaModule } from "../unidade-medida/module";
import { EmpresaModule } from "../empresa/module";
import { SetorModule } from "../setor/module";
import { CustosDiaModule } from "../custos-dia/module";
import { DepositoRequisicaoModule } from "../deposito-requisicao/module";
import { RequisicaoCompraModule } from "../requisicao-compra/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        ProdutoModule,
        UnidadeMedidaModule,
        SetorModule,
        CustosDiaModule,
        RequisicaoCompraModule,
        DepositoRequisicaoModule,

        TypeOrmModule.forFeature([RequisicaoCompraItem, RequisicaoCompraItemUser]),
        BaseCrudModule
    ],
    controllers:[RequisicaoCompraItemController, RequisicaoCompraItemUserController],
    providers:[RequisicaoCompraItemService, RequisicaoCompraItemUserService],
    exports:[RequisicaoCompraItemService, RequisicaoCompraItemUserService]
})
export class RequisicaoCompraItemModule {}