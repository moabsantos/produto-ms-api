import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { FornecedorEstabelecimentoController } from "./crud.controller";
import { FornecedorEstabelecimento } from "./crud.entity";
import { FornecedorEstabelecimentoUser } from "./crud-user.entity";
import { FornecedorEstabelecimentoUserController } from "./crud-user.controller";
import { FornecedorEstabelecimentoService } from "./service";
import { FornecedorEstabelecimentoUserService } from "./crud-user.service";
import { FornecedorModule } from "../fornecedor/module";
import { CidadeModule } from "../cidade/module";
import { RepresentanteModule } from "../representante/module";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        FornecedorModule,
        RepresentanteModule,
        CidadeModule,

        TypeOrmModule.forFeature([FornecedorEstabelecimento, FornecedorEstabelecimentoUser]),
        BaseCrudModule
    ],
    controllers:[FornecedorEstabelecimentoController, FornecedorEstabelecimentoUserController],
    providers:[FornecedorEstabelecimentoService, FornecedorEstabelecimentoUserService],
    exports:[FornecedorEstabelecimentoService, FornecedorEstabelecimentoUserService]
})
export class FornecedorEstabelecimentoModule {}