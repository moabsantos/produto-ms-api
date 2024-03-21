import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { PedidoCompraContratoController } from "./crud.controller";
import { PedidoCompraContrato } from "./crud.entity";
import { PedidoCompraContratoUser } from "./crud-user.entity";
import { PedidoCompraContratoUserController } from "./crud-user.controller";
import { PedidoCompraContratoService } from "./service";
import { PedidoCompraContratoUserService } from "./crud-user.service";

import { FornecedorModule } from "../fornecedor/module";
import { PedidoCompraModule } from "../pedido-compra/module";
import { FormaPagamentoModule } from "../forma-pagamento/module";
import { TipoDocumentoModule } from "../tipo-documento/module";
import { EmpresaModule } from "../empresa/module";
import { CentroCustoModule } from "../centro-custo/module";
import { DespesaFinanceiraModule } from "../despesa-financeira/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        EmpresaModule,
        PedidoCompraModule,
        TipoDocumentoModule,
        FornecedorModule,
        CentroCustoModule,
        DespesaFinanceiraModule,
        FormaPagamentoModule,

        TypeOrmModule.forFeature([PedidoCompraContrato, PedidoCompraContratoUser]),
        BaseCrudModule
    ],
    controllers:[PedidoCompraContratoController, PedidoCompraContratoUserController],
    providers:[PedidoCompraContratoService, PedidoCompraContratoUserService],
    exports:[PedidoCompraContratoService, PedidoCompraContratoUserService]
})
export class PedidoCompraContratoModule {}