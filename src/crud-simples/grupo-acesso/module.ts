import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { GrupoAcessoController } from "./crud.controller";
import { GrupoAcesso } from "./crud.entity";
import { GrupoAcessoUser } from "./crud-user.entity";
import { GrupoAcessoUserController } from "./crud-user.controller";
import { GrupoAcessoService } from "./service";
import { GrupoAcessoUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([GrupoAcesso, GrupoAcessoUser]),
        BaseCrudModule
    ],
    controllers:[GrupoAcessoController, GrupoAcessoUserController],
    providers:[GrupoAcessoService, GrupoAcessoUserService],
    exports:[GrupoAcessoService, GrupoAcessoUserService]
})
export class GrupoAcessoModule {}