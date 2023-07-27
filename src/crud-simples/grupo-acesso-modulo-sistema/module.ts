import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { GrupoAcessoModuloSistemaController } from "./crud.controller";
import { GrupoAcessoModuloSistema } from "./crud.entity";
import { GrupoAcessoModuloSistemaUser } from "./crud-user.entity";
import { GrupoAcessoModuloSistemaUserController } from "./crud-user.controller";
import { GrupoAcessoModuloSistemaService } from "./service";
import { GrupoAcessoModuloSistemaUserService } from "./crud-user.service";
import { GrupoAcessoModule } from "../grupo-acesso/module";
import { ModuloSistemaModule } from "../modulo-sistema/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        GrupoAcessoModule,
        ModuloSistemaModule,
        
        TypeOrmModule.forFeature([GrupoAcessoModuloSistema, GrupoAcessoModuloSistemaUser]),
        BaseCrudModule
    ],
    controllers:[GrupoAcessoModuloSistemaController, GrupoAcessoModuloSistemaUserController],
    providers:[GrupoAcessoModuloSistemaService, GrupoAcessoModuloSistemaUserService],
    exports:[GrupoAcessoModuloSistemaService, GrupoAcessoModuloSistemaUserService]
})
export class GrupoAcessoModuloSistemaModule {}