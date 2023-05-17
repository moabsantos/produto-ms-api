import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { ProducaoDiaController } from "./crud.controller";
import { ProducaoDia } from "./crud.entity";
import { ProducaoDiaUser } from "./crud-user.entity";
import { ProducaoDiaUserController } from "./crud-user.controller";
import { ProducaoDiaService } from "./service";
import { ProducaoDiaUserService } from "./crud-user.service";
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

        TypeOrmModule.forFeature([ProducaoDia, ProducaoDiaUser]),
        BaseCrudModule
    ],
    controllers:[ProducaoDiaController, ProducaoDiaUserController],
    providers:[ProducaoDiaService, ProducaoDiaUserService],
    exports:[ProducaoDiaService, ProducaoDiaUserService]
})
export class ProducaoDiaModule {}