import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { EmpresaController } from "./crud.controller";
import { Empresa } from "./crud.entity";
import { EmpresaUser } from "./crud-user.entity";
import { EmpresaUserController } from "./crud-user.controller";
import { EmpresaService } from "./service";
import { EmpresaUserService } from "./crud-user.service";
import { CidadeModule } from "../cidade/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        CidadeModule,
        
        TypeOrmModule.forFeature([Empresa, EmpresaUser]),
        BaseCrudModule
    ],
    controllers:[EmpresaController, EmpresaUserController],
    providers:[EmpresaService, EmpresaUserService],
    exports:[EmpresaService, EmpresaUserService]
})
export class EmpresaModule {}