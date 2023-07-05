import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { PedidoCompraItemController } from "./crud.controller";
import { PedidoCompraItem } from "./crud.entity";
import { PedidoCompraItemUser } from "./crud-user.entity";
import { PedidoCompraItemUserController } from "./crud-user.controller";
import { PedidoCompraItemService } from "./service";
import { PedidoCompraItemUserService } from "./crud-user.service";
import { ProdutoModule } from "../produto/module";
import { UnidadeMedidaModule } from "../unidade-medida/module";
import { EmpresaModule } from "../empresa/module";
import { SetorModule } from "../setor/module";
import { CustosDiaModule } from "../custos-dia/module";
import { DepositoRequisicaoModule } from "../deposito-requisicao/module";
import { PedidoCompraModule } from "../pedido-compra/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        EmpresaModule,
        ProdutoModule,
        UnidadeMedidaModule,
        SetorModule,
        CustosDiaModule,
        PedidoCompraModule,
        DepositoRequisicaoModule,

        TypeOrmModule.forFeature([PedidoCompraItem, PedidoCompraItemUser]),
        BaseCrudModule
    ],
    controllers:[PedidoCompraItemController, PedidoCompraItemUserController],
    providers:[PedidoCompraItemService, PedidoCompraItemUserService],
    exports:[PedidoCompraItemService, PedidoCompraItemUserService]
})
export class PedidoCompraItemModule {}