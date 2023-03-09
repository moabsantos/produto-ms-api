import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { OrdemProducaoController } from "./crud.controller";
import { OrdemProducao } from "./crud.entity";
import { OrdemProducaoUser } from "./crud-user.entity";
import { OrdemProducaoUserController } from "./crud-user.controller";
import { OrdemProducaoService } from "./service";
import { OrdemProducaoUserService } from "./crud-user.service";
import { ClienteModule } from "../cliente/module";
import { ClienteEstabelecimentoModule } from "../cliente-estabelecimento/module";
import { PedidoVendaModule } from "../pedido-venda/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
    
        TypeOrmModule.forFeature([OrdemProducao, OrdemProducaoUser]),
        ClienteModule,
        PedidoVendaModule,
        BaseCrudModule
    ],
    controllers:[OrdemProducaoController, OrdemProducaoUserController],
    providers:[OrdemProducaoService, OrdemProducaoUserService],
    exports:[OrdemProducaoService, OrdemProducaoUserService]
})
export class OrdemProducaoModule {}