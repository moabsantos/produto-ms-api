import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoController } from "./crud.controller";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";
import { Produto } from "./crud.entity";
import { ProdutoUser } from "./crud-user.entity";
import { ProdutoService } from "./service";
import { ProdutoUserService } from "./crud-user.service";
import { ProdutoUserController } from "./crud-user.controller";
import { UnidadeMedidaModule } from "../unidade-medida/module";


@Module({
    imports: [
        HttpModule,
        
        TypeOrmModule.forFeature([Produto, ProdutoUser]),
        BaseCrudModule,

        UserModule,
        UnidadeMedidaModule
    ],
    controllers:[ProdutoController, ProdutoUserController],
    providers:[ProdutoService, ProdutoUserService],
    exports:[ProdutoService, ProdutoUserService]
})
export class ProdutoModule {}