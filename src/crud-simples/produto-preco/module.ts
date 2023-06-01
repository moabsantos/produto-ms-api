import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoPrecoController } from "./crud.controller";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";
import { ProdutoPreco } from "./crud.entity";
import { ProdutoPrecoUser } from "./crud-user.entity";
import { ProdutoPrecoService } from "./service";
import { ProdutoPrecoUserService } from "./crud-user.service";
import { ProdutoPrecoUserController } from "./crud-user.controller";
import { UnidadeMedidaModule } from "../unidade-medida/module";
import { ProdutoModule } from "../produto/module";
import { EstagioModule } from "../estagio/module";


@Module({
    imports: [
        HttpModule,
        
        TypeOrmModule.forFeature([ProdutoPreco, ProdutoPrecoUser]),
        BaseCrudModule,

        UserModule,
        UnidadeMedidaModule,
        ProdutoModule
    ],
    controllers:[ProdutoPrecoController, ProdutoPrecoUserController],
    providers:[ProdutoPrecoService, ProdutoPrecoUserService],
    exports:[ProdutoPrecoService, ProdutoPrecoUserService]
})
export class ProdutoPrecoModule {}