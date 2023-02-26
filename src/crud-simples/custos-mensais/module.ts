import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { CustosMensaisController } from "./crud.controller";
import { CustosMensais } from "./crud.entity";
import { CustosMensaisUser } from "./crud-user.entity";
import { CustosMensaisUserController } from "./crud-user.controller";
import { CustosMensaisService } from "./service";
import { CustosMensaisUserService } from "./crud-user.service";
import { ProdutoModule } from "../produto/module";
import { UnidadeMedidaModule } from "../unidade-medida/module";
import { EmpresaModule } from "../empresa/module";
import { SetorModule } from "../setor/module";


@Module({
    imports: [
        HttpModule,
        UserModule,
        
        ProdutoModule,
        UnidadeMedidaModule,
        EmpresaModule,
        SetorModule,

        TypeOrmModule.forFeature([CustosMensais, CustosMensaisUser]),
        BaseCrudModule
    ],
    controllers:[CustosMensaisController, CustosMensaisUserController],
    providers:[
        CustosMensaisService, CustosMensaisUserService
    ],
    exports:[CustosMensaisService, CustosMensaisUserService]
})
export class CustosMensaisModule {}