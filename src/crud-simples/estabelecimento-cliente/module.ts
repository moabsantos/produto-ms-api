import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { EstabelecimentoClienteController } from "./crud.controller";
import { EstabelecimentoCliente } from "./crud.entity";
import { EstabelecimentoClienteUser } from "./crud-user.entity";
import { EstabelecimentoClienteUserController } from "./crud-user.controller";
import { EstabelecimentoClienteService } from "./service";
import { EstabelecimentoClienteUserService } from "./crud-user.service";
import { ClienteModule } from "../cliente/module";
import { CidadeModule } from "../cidade/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        ClienteModule,
        CidadeModule,

        TypeOrmModule.forFeature([EstabelecimentoCliente, EstabelecimentoClienteUser]),
        BaseCrudModule
    ],
    controllers:[EstabelecimentoClienteController, EstabelecimentoClienteUserController],
    providers:[EstabelecimentoClienteService, EstabelecimentoClienteUserService],
    exports:[EstabelecimentoClienteService, EstabelecimentoClienteUserService]
})
export class EstabelecimentoClienteModule {}