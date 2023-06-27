import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { RequisicaoAlmoxarifadoItemController } from "./crud.controller";
import { RequisicaoAlmoxarifadoItem } from "./crud.entity";
import { RequisicaoAlmoxarifadoItemUser } from "./crud-user.entity";
import { RequisicaoAlmoxarifadoItemUserController } from "./crud-user.controller";
import { RequisicaoAlmoxarifadoItemService } from "./service";
import { RequisicaoAlmoxarifadoItemUserService } from "./crud-user.service";
import { ProdutoModule } from "../produto/module";
import { UnidadeMedidaModule } from "../unidade-medida/module";
import { EmpresaModule } from "../empresa/module";
import { SetorModule } from "../setor/module";
import { CustosDiaModule } from "../custos-dia/module";
import { DepositoRequisicaoModule } from "../deposito-requisicao/module";
import { RequisicaoAlmoxarifadoModule } from "../requisicao-almoxarifado/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        ProdutoModule,
        UnidadeMedidaModule,
        SetorModule,
        CustosDiaModule,
        RequisicaoAlmoxarifadoModule,
        DepositoRequisicaoModule,

        TypeOrmModule.forFeature([RequisicaoAlmoxarifadoItem, RequisicaoAlmoxarifadoItemUser]),
        BaseCrudModule
    ],
    controllers:[RequisicaoAlmoxarifadoItemController, RequisicaoAlmoxarifadoItemUserController],
    providers:[RequisicaoAlmoxarifadoItemService, RequisicaoAlmoxarifadoItemUserService],
    exports:[RequisicaoAlmoxarifadoItemService, RequisicaoAlmoxarifadoItemUserService]
})
export class RequisicaoAlmoxarifadoItemModule {}