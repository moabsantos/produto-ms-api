import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { RequisicaoAlmoxarifadoController } from "./crud.controller";
import { RequisicaoAlmoxarifado } from "./crud.entity";
import { RequisicaoAlmoxarifadoUser } from "./crud-user.entity";
import { RequisicaoAlmoxarifadoUserController } from "./crud-user.controller";
import { RequisicaoAlmoxarifadoService } from "./service";
import { RequisicaoAlmoxarifadoUserService } from "./crud-user.service";
import { EmpresaModule } from "../empresa/module";
import { DepositoModule } from "../deposito/module";
import { ClienteModule } from "../cliente/module";
import { ClienteEstabelecimentoModule } from "../cliente-estabelecimento/module";
import { RequisicaoGrupoModule } from "../requisicao-grupo/module";
import { SetorModule } from "../setor/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        EmpresaModule,
        SetorModule,
        RequisicaoGrupoModule,
        ClienteModule,
        ClienteEstabelecimentoModule,
        DepositoModule,
        
        TypeOrmModule.forFeature([RequisicaoAlmoxarifado, RequisicaoAlmoxarifadoUser]),
        BaseCrudModule
    ],
    controllers:[RequisicaoAlmoxarifadoController, RequisicaoAlmoxarifadoUserController],
    providers:[RequisicaoAlmoxarifadoService, RequisicaoAlmoxarifadoUserService],
    exports:[RequisicaoAlmoxarifadoService, RequisicaoAlmoxarifadoUserService]
})
export class RequisicaoAlmoxarifadoModule {}