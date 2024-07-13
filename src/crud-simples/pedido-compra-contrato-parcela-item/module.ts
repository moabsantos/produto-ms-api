import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { PedidoCompraContratoParcelaItemParcelaItem } from "./crud.entity";
import { PedidoCompraContratoParcelaItemUser } from "./crud-user.entity";

import { PedidoCompraContratoParcelaItemService } from "./service";
import { PedidoCompraContratoParcelaItemUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,

        TypeOrmModule.forFeature([PedidoCompraContratoParcelaItemParcelaItem, PedidoCompraContratoParcelaItemUser]),
        BaseCrudModule
    ],

    providers:[PedidoCompraContratoParcelaItemService, PedidoCompraContratoParcelaItemUserService],
    exports:[PedidoCompraContratoParcelaItemService, PedidoCompraContratoParcelaItemUserService]
})
export class PedidoCompraContratoParcelaItemModule {}