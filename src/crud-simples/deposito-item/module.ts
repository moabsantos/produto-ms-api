import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { DepositoItemController } from "./crud.controller";
import { DepositoItem } from "./crud.entity";
import { DepositoItemUser } from "./crud-user.entity";
import { DepositoItemUserController } from "./crud-user.controller";
import { DepositoItemService } from "./service";
import { DepositoItemUserService } from "./crud-user.service";
import { ProdutoModule } from "../produto/module";
import { UnidadeMedidaModule } from "../unidade-medida/module";
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
        UnidadeMedidaModule,
        DepositoModule,

        TypeOrmModule.forFeature([DepositoItem, DepositoItemUser]),
        BaseCrudModule
    ],
    controllers:[DepositoItemController, DepositoItemUserController],
    providers:[DepositoItemService, DepositoItemUserService],
    exports:[DepositoItemService, DepositoItemUserService]
})
export class DepositoItemModule {}