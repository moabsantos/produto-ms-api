import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { PedidoCompraController } from "./crud.controller";
import { PedidoCompra } from "./crud.entity";
import { PedidoCompraUser } from "./crud-user.entity";
import { PedidoCompraUserController } from "./crud-user.controller";
import { PedidoCompraService } from "./service";
import { PedidoCompraUserService } from "./crud-user.service";
import { EmpresaModule } from "../empresa/module";
import { DepositoModule } from "../deposito/module";
import { FormaPagamentoModule } from "../forma-pagamento/module";
import { FornecedorModule } from "../fornecedor/module";
import { SetorModule } from "../setor/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        EmpresaModule,
        SetorModule,
        DepositoModule,
        FormaPagamentoModule,
        FornecedorModule,
        
        TypeOrmModule.forFeature([PedidoCompra, PedidoCompraUser]),
        BaseCrudModule
    ],
    controllers:[PedidoCompraController, PedidoCompraUserController],
    providers:[PedidoCompraService, PedidoCompraUserService],
    exports:[PedidoCompraService, PedidoCompraUserService]
})
export class PedidoCompraModule {}