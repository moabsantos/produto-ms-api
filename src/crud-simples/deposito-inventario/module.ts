import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { DepositoInventarioController } from "./crud.controller";
import { DepositoInventario } from "./crud.entity";
import { DepositoInventarioUser } from "./crud-user.entity";
import { DepositoInventarioUserController } from "./crud-user.controller";
import { DepositoInventarioService } from "./service";
import { DepositoInventarioUserService } from "./crud-user.service";
import { ProdutoModule } from "../produto/module";
import { EmpresaModule } from "../empresa/module";
import { DepositoModule } from "../deposito/module";
import { ProdutoGrupoModule } from "../produto-grupo/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        EmpresaModule,
        ProdutoModule,
        ProdutoGrupoModule,
        DepositoModule,

        TypeOrmModule.forFeature([DepositoInventario, DepositoInventarioUser]),
        BaseCrudModule
    ],
    controllers:[DepositoInventarioController, DepositoInventarioUserController],
    providers:[DepositoInventarioService, DepositoInventarioUserService],
    exports:[DepositoInventarioService, DepositoInventarioUserService]
})
export class DepositoInventarioModule {}