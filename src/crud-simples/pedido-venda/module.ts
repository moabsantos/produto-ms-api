import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { PedidoVendaController } from "./crud.controller";
import { PedidoVenda } from "./crud.entity";
import { PedidoVendaUser } from "./crud-user.entity";
import { PedidoVendaUserController } from "./crud-user.controller";
import { PedidoVendaService } from "./service";
import { PedidoVendaUserService } from "./crud-user.service";
import { ClienteModule } from "../cliente/module";
import { ClienteEstabelecimentoModule } from "../cliente-estabelecimento/module";
import { PrioridadeModule } from "../prioridade/module";
import { PedidoStatusModule } from "../pedido-status/module";
import { EmpresaModule } from "../empresa/module";
import { FormaPagamentoModule } from "../forma-pagamento/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
    
        TypeOrmModule.forFeature([PedidoVenda, PedidoVendaUser]),
        EmpresaModule,
        ClienteModule,
        ClienteEstabelecimentoModule,
        PrioridadeModule,
        FormaPagamentoModule,
        
        BaseCrudModule
    ],
    controllers:[PedidoVendaController, PedidoVendaUserController],
    providers:[PedidoVendaService, PedidoVendaUserService],
    exports:[PedidoVendaService, PedidoVendaUserService]
})
export class PedidoVendaModule {}