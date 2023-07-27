import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModuloSistemaController } from "./crud.controller";
import { ModuloSistema } from "./crud.entity";
import { ModuloSistemaUser } from "./crud-user.entity";
import { ModuloSistemaUserController } from "./crud-user.controller";
import { ModuloSistemaService } from "./service";
import { ModuloSistemaUserService } from "./crud-user.service";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";


@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([ModuloSistema, ModuloSistemaUser]),
        BaseCrudModule
    ],
    controllers:[ModuloSistemaController, ModuloSistemaUserController],
    providers:[ModuloSistemaService, ModuloSistemaUserService],
    exports:[ModuloSistemaService, ModuloSistemaUserService]
})
export class ModuloSistemaModule {}