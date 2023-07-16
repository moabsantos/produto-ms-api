import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { RequisicaoCompraController } from "./crud.controller";
import { RequisicaoCompra } from "./crud.entity";
import { RequisicaoCompraUser } from "./crud-user.entity";
import { RequisicaoCompraUserController } from "./crud-user.controller";
import { RequisicaoCompraService } from "./service";
import { RequisicaoCompraUserService } from "./crud-user.service";
import { EmpresaModule } from "../empresa/module";
import { DepositoModule } from "../deposito/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        EmpresaModule,
        DepositoModule,
        
        TypeOrmModule.forFeature([RequisicaoCompra, RequisicaoCompraUser]),
        BaseCrudModule
    ],
    controllers:[RequisicaoCompraController, RequisicaoCompraUserController],
    providers:[RequisicaoCompraService, RequisicaoCompraUserService],
    exports:[RequisicaoCompraService, RequisicaoCompraUserService]
})
export class RequisicaoCompraModule {}