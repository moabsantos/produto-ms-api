import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { CustosDiaController } from "./crud.controller";
import { CustosDia } from "./crud.entity";
import { CustosDiaUser } from "./crud-user.entity";
import { CustosDiaUserController } from "./crud-user.controller";
import { CustosDiaService } from "./service";
import { CustosDiaUserService } from "./crud-user.service";
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

        TypeOrmModule.forFeature([CustosDia, CustosDiaUser]),
        BaseCrudModule
    ],
    controllers:[CustosDiaController, CustosDiaUserController],
    providers:[CustosDiaService, CustosDiaUserService],
    exports:[CustosDiaService, CustosDiaUserService]
})
export class CustosDiaModule {}