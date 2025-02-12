import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios/dist/http.module";

import { BaseCrudModule } from "src/_shared/base-crud.module";
import { UserModule } from "src/_user/user.module";

import { PedidoVendaFacadeController } from "./controller";
import { PedidoVendaFacadeService } from "./service";

import { PedidoVendaModule } from "src/crud-simples/pedido-venda/module";
import { PedidoVendaItemModule } from "src/crud-simples/pedido-venda-item/module";
import { RequisicaoAlmoxarifadoModule } from "src/crud-simples/requisicao-almoxarifado/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        BaseCrudModule,

        PedidoVendaModule,
        PedidoVendaItemModule,
        RequisicaoAlmoxarifadoModule        
    ],
    controllers:[PedidoVendaFacadeController],
    providers:[PedidoVendaFacadeService],
    exports:[]
})
export class PedidoVendaFacadeModule {}