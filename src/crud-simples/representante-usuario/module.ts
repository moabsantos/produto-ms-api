import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { RepresentanteUsuarioController } from "./crud.controller";
import { RepresentanteUsuario } from "./crud.entity";
import { RepresentanteUsuarioUser } from "./crud-user.entity";
import { RepresentanteUsuarioUserController } from "./crud-user.controller";
import { RepresentanteUsuarioService } from "./service";
import { RepresentanteUsuarioUserService } from "./crud-user.service";
import { EmpresaModule } from "../empresa/module";
import { RepresentanteModule } from "../representante/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        EmpresaModule,
        RepresentanteModule,
        UserModule,

        TypeOrmModule.forFeature([RepresentanteUsuario, RepresentanteUsuarioUser]),
        BaseCrudModule
    ],
    controllers:[RepresentanteUsuarioController, RepresentanteUsuarioUserController],
    providers:[RepresentanteUsuarioService, RepresentanteUsuarioUserService],
    exports:[RepresentanteUsuarioService, RepresentanteUsuarioUserService]
})
export class RepresentanteUsuarioModule {}