import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { RequisicaoGrupoController } from "./crud.controller";
import { RequisicaoGrupo } from "./crud.entity";
import { RequisicaoGrupoUser } from "./crud-user.entity";
import { RequisicaoGrupoUserController } from "./crud-user.controller";
import { RequisicaoGrupoService } from "./service";
import { RequisicaoGrupoUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,

        TypeOrmModule.forFeature([RequisicaoGrupo, RequisicaoGrupoUser]),
        BaseCrudModule
    ],
    controllers:[RequisicaoGrupoController, RequisicaoGrupoUserController],
    providers:[RequisicaoGrupoService, RequisicaoGrupoUserService],
    exports:[RequisicaoGrupoService, RequisicaoGrupoUserService]
})
export class RequisicaoGrupoModule {}