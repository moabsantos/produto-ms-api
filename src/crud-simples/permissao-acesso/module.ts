import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissaoAcessoController } from "./crud.controller";
import { PermissaoAcesso } from "./crud.entity";
import { PermissaoAcessoUser } from "./crud-user.entity";
import { PermissaoAcessoUserController } from "./crud-user.controller";
import { PermissaoAcessoService } from "./service";
import { PermissaoAcessoUserService } from "./crud-user.service";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";


@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([PermissaoAcesso, PermissaoAcessoUser]),
        BaseCrudModule
    ],
    controllers:[PermissaoAcessoController, PermissaoAcessoUserController],
    providers:[PermissaoAcessoService, PermissaoAcessoUserService],
    exports:[PermissaoAcessoService, PermissaoAcessoUserService]
})
export class PermissaoAcessoModule {}