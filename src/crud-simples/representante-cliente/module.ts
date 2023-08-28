import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { RepresentanteClienteController } from "./crud.controller";
import { RepresentanteCliente } from "./crud.entity";
import { RepresentanteClienteUser } from "./crud-user.entity";
import { RepresentanteClienteUserController } from "./crud-user.controller";
import { RepresentanteClienteService } from "./service";
import { RepresentanteClienteUserService } from "./crud-user.service";
import { EmpresaModule } from "../empresa/module";
import { RepresentanteModule } from "../representante/module";
import { ClienteModule } from "../cliente/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        EmpresaModule,
        RepresentanteModule,
        ClienteModule,

        TypeOrmModule.forFeature([RepresentanteCliente, RepresentanteClienteUser]),
        BaseCrudModule
    ],
    controllers:[RepresentanteClienteController, RepresentanteClienteUserController],
    providers:[RepresentanteClienteService, RepresentanteClienteUserService],
    exports:[RepresentanteClienteService, RepresentanteClienteUserService]
})
export class RepresentanteClienteModule {}