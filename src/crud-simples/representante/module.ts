import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { RepresentanteController } from "./crud.controller";
import { Representante } from "./crud.entity";
import { RepresentanteUser } from "./crud-user.entity";
import { RepresentanteUserController } from "./crud-user.controller";
import { RepresentanteService } from "./service";
import { RepresentanteUserService } from "./crud-user.service";
import { EmpresaModule } from "../empresa/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        EmpresaModule,

        TypeOrmModule.forFeature([Representante, RepresentanteUser]),
        BaseCrudModule
    ],
    controllers:[RepresentanteController, RepresentanteUserController],
    providers:[RepresentanteService, RepresentanteUserService],
    exports:[RepresentanteService, RepresentanteUserService]
})
export class RepresentanteModule {}