import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { PedidoVendaItemController } from "./crud.controller";
import { PedidoVendaItem } from "./crud.entity";
import { PedidoVendaItemUser } from "./crud-user.entity";
import { PedidoVendaItemUserController } from "./crud-user.controller";
import { PedidoVendaItemService } from "./service";
import { PedidoVendaItemUserService } from "./crud-user.service";
import { PedidoVendaModule } from "../pedido-venda/module";
import { ProdutoModule } from "../produto/module";
import { DepositoRequisicaoModule } from "../deposito-requisicao/module";
import { UnidadeMedidaModule } from "../unidade-medida/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        PedidoVendaModule,
        ProdutoModule,
        UnidadeMedidaModule,
        DepositoRequisicaoModule,
        
        TypeOrmModule.forFeature([PedidoVendaItem, PedidoVendaItemUser]),
        BaseCrudModule
    ],
    controllers:[PedidoVendaItemController, PedidoVendaItemUserController],
    providers:[PedidoVendaItemService, PedidoVendaItemUserService],
    exports:[PedidoVendaItemService, PedidoVendaItemUserService]
})
export class PedidoVendaItemModule {}