import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { OrdemProducaoItemController } from "./crud.controller";
import { OrdemProducaoItem } from "./crud.entity";
import { OrdemProducaoItemUser } from "./crud-user.entity";
import { OrdemProducaoItemUserController } from "./crud-user.controller";
import { OrdemProducaoItemService } from "./service";
import { OrdemProducaoItemUserService } from "./crud-user.service";

import { ProdutoModule } from "../produto/module";
import { OrdemProducaoModule } from "../ordem-producao/module";
import { PedidoVendaModule } from "../pedido-venda/module";
import { EstagioModule } from "../estagio/module";
import { UnidadeMedidaModule } from "../unidade-medida/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        OrdemProducaoModule,
        PedidoVendaModule,
        ProdutoModule,
        EstagioModule,
        UnidadeMedidaModule,
        
        TypeOrmModule.forFeature([OrdemProducaoItem, OrdemProducaoItemUser]),
        BaseCrudModule
    ],
    controllers:[OrdemProducaoItemController, OrdemProducaoItemUserController],
    providers:[OrdemProducaoItemService, OrdemProducaoItemUserService],
    exports:[OrdemProducaoItemService, OrdemProducaoItemUserService]
})
export class OrdemProducaoItemModule {}