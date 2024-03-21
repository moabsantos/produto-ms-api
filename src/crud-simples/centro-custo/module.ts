import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { CentroCustoController } from "./crud.controller";
import { CentroCusto } from "./crud.entity";
import { CentroCustoUser } from "./crud-user.entity";
import { CentroCustoUserController } from "./crud-user.controller";
import { CentroCustoService } from "./service";
import { CentroCustoUserService } from "./crud-user.service";
import { EmpresaModule } from "../empresa/module";
import { SetorModule } from "../setor/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        SetorModule,
        EmpresaModule,
        
        TypeOrmModule.forFeature([CentroCusto, CentroCustoUser]),
        BaseCrudModule
    ],
    controllers:[CentroCustoController, CentroCustoUserController],
    providers:[CentroCustoService, CentroCustoUserService],
    exports:[CentroCustoService, CentroCustoUserService]
})
export class CentroCustoModule {}