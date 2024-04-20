import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { FiscalNfeProdutoController } from "./crud.controller";
import { FiscalNfeProduto } from "./crud.entity";
import { FiscalNfeProdutoUser } from "./crud-user.entity";
import { FiscalNfeProdutoUserController } from "./crud-user.controller";
import { FiscalNfeProdutoService } from "./service";
import { FiscalNfeProdutoUserService } from "./crud-user.service";
import { EmpresaModule } from "../empresa/module";
import { FiscalNaturezaOperacaoModule } from "../fiscal-natureza-operacao/module";
import { FiscalSerieModule } from "../fiscal-serie/module";
import { ClienteModule } from "../cliente/module";
import { ClienteEstabelecimentoModule } from "../cliente-estabelecimento/module";
import { CidadeModule } from "../cidade/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        EmpresaModule,
        FiscalNaturezaOperacaoModule,
        FiscalSerieModule,
        ClienteModule,
        ClienteEstabelecimentoModule,
        CidadeModule,
        
        TypeOrmModule.forFeature([FiscalNfeProduto, FiscalNfeProdutoUser]),
        BaseCrudModule
    ],
    controllers:[FiscalNfeProdutoController, FiscalNfeProdutoUserController],
    providers:[FiscalNfeProdutoService, FiscalNfeProdutoUserService],
    exports:[FiscalNfeProdutoService, FiscalNfeProdutoUserService]
})
export class FiscalNfeProdutoModule {}