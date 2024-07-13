import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { PedidoCompraContratoParcelaController } from "./crud.controller";
import { PedidoCompraContratoParcela } from "./crud.entity";
import { PedidoCompraContratoParcelaUser } from "./crud-user.entity";
import { PedidoCompraContratoParcelaUserController } from "./crud-user.controller";
import { PedidoCompraContratoParcelaService } from "./service";
import { PedidoCompraContratoParcelaUserService } from "./crud-user.service";
import { PedidoCompraModule } from "../pedido-compra/module";
import { PedidoCompraContratoModule } from "../pedido-compra-contrato/module";
import { TipoDocumentoModule } from "../tipo-documento/module";
import { FornecedorModule } from "../fornecedor/module";
import { FormaPagamentoModule } from "../forma-pagamento/module";
import { PedidoCompraContratoParcelaItemModule } from "../pedido-compra-contrato-parcela-item/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        PedidoCompraModule,
        PedidoCompraContratoModule,
        TipoDocumentoModule,
        FornecedorModule,
        FormaPagamentoModule,
        PedidoCompraContratoParcelaItemModule,

        TypeOrmModule.forFeature([PedidoCompraContratoParcela, PedidoCompraContratoParcelaUser]),
        BaseCrudModule
    ],
    controllers:[PedidoCompraContratoParcelaController, PedidoCompraContratoParcelaUserController],
    providers:[PedidoCompraContratoParcelaService, PedidoCompraContratoParcelaUserService],
    exports:[PedidoCompraContratoParcelaService, PedidoCompraContratoParcelaUserService]
})
export class PedidoCompraContratoParcelaModule {}