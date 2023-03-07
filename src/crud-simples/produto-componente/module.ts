import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoComponenteController } from "./crud.controller";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";
import { ProdutoComponente } from "./crud.entity";
import { ProdutoComponenteUser } from "./crud-user.entity";
import { ProdutoComponenteService } from "./service";
import { ProdutoComponenteUserService } from "./crud-user.service";
import { ProdutoComponenteUserController } from "./crud-user.controller";
import { UnidadeMedidaModule } from "../unidade-medida/module";
import { ProdutoModule } from "../produto/module";
import { EstagioModule } from "../estagio/module";


@Module({
    imports: [
        HttpModule,
        
        TypeOrmModule.forFeature([ProdutoComponente, ProdutoComponenteUser]),
        BaseCrudModule,

        UserModule,
        UnidadeMedidaModule,
        ProdutoModule,
        EstagioModule
    ],
    controllers:[ProdutoComponenteController, ProdutoComponenteUserController],
    providers:[ProdutoComponenteService, ProdutoComponenteUserService],
    exports:[ProdutoComponenteService, ProdutoComponenteUserService]
})
export class ProdutoComponenteModule {}