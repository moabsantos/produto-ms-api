import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { ClienteEstabelecimentoController } from "./crud.controller";
import { ClienteEstabelecimento } from "./crud.entity";
import { ClienteEstabelecimentoUser } from "./crud-user.entity";
import { ClienteEstabelecimentoUserController } from "./crud-user.controller";
import { ClienteEstabelecimentoService } from "./service";
import { ClienteEstabelecimentoUserService } from "./crud-user.service";
import { ClienteModule } from "../cliente/module";
import { CidadeModule } from "../cidade/module";
import { RepresentanteModule } from "../representante/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        ClienteModule,
        RepresentanteModule,
        CidadeModule,

        TypeOrmModule.forFeature([ClienteEstabelecimento, ClienteEstabelecimentoUser]),
        BaseCrudModule
    ],
    controllers:[ClienteEstabelecimentoController, ClienteEstabelecimentoUserController],
    providers:[ClienteEstabelecimentoService, ClienteEstabelecimentoUserService],
    exports:[ClienteEstabelecimentoService, ClienteEstabelecimentoUserService]
})
export class ClienteEstabelecimentoModule {}