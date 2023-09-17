import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { ProdutoComponenteParteController } from "./crud.controller";
import { ProdutoComponenteParte } from "./crud.entity";
import { ProdutoComponenteParteUser } from "./crud-user.entity";
import { ProdutoComponenteParteUserController } from "./crud-user.controller";
import { ProdutoComponenteParteService } from "./service";
import { ProdutoComponenteParteUserService } from "./crud-user.service";
import { ProdutoComponenteModule } from "../produto-componente/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        ProdutoComponenteModule,

        TypeOrmModule.forFeature([ProdutoComponenteParte, ProdutoComponenteParteUser]),
        BaseCrudModule
    ],
    controllers:[ProdutoComponenteParteController, ProdutoComponenteParteUserController],
    providers:[ProdutoComponenteParteService, ProdutoComponenteParteUserService],
    exports:[ProdutoComponenteParteService, ProdutoComponenteParteUserService]
})
export class ProdutoComponenteParteModule {}