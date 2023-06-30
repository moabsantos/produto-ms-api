import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { GrupoAcessoUsuarioController } from "./crud.controller";
import { GrupoAcessoUsuario } from "./crud.entity";
import { GrupoAcessoUsuarioUser } from "./crud-user.entity";
import { GrupoAcessoUsuarioUserController } from "./crud-user.controller";
import { GrupoAcessoUsuarioService } from "./service";
import { GrupoAcessoUsuarioUserService } from "./crud-user.service";
import { GrupoAcessoModule } from "../grupo-acesso/module";
import { EmpresaModule } from "../empresa/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        GrupoAcessoModule,
        UserModule,
        EmpresaModule,
        
        TypeOrmModule.forFeature([GrupoAcessoUsuario, GrupoAcessoUsuarioUser]),
        BaseCrudModule
    ],
    controllers:[GrupoAcessoUsuarioController, GrupoAcessoUsuarioUserController],
    providers:[GrupoAcessoUsuarioService, GrupoAcessoUsuarioUserService],
    exports:[GrupoAcessoUsuarioService, GrupoAcessoUsuarioUserService]
})
export class GrupoAcessoUsuarioModule {}