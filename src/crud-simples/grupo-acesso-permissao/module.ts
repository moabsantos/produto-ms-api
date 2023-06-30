import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { GrupoAcessoPermissaoController } from "./crud.controller";
import { GrupoAcessoPermissao } from "./crud.entity";
import { GrupoAcessoPermissaoUser } from "./crud-user.entity";
import { GrupoAcessoPermissaoUserController } from "./crud-user.controller";
import { GrupoAcessoPermissaoService } from "./service";
import { GrupoAcessoPermissaoUserService } from "./crud-user.service";
import { GrupoAcessoModule } from "../grupo-acesso/module";
import { PermissaoAcessoModule } from "../permissao-acesso/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        GrupoAcessoModule,
        PermissaoAcessoModule,
        
        TypeOrmModule.forFeature([GrupoAcessoPermissao, GrupoAcessoPermissaoUser]),
        BaseCrudModule
    ],
    controllers:[GrupoAcessoPermissaoController, GrupoAcessoPermissaoUserController],
    providers:[GrupoAcessoPermissaoService, GrupoAcessoPermissaoUserService],
    exports:[GrupoAcessoPermissaoService, GrupoAcessoPermissaoUserService]
})
export class GrupoAcessoPermissaoModule {}