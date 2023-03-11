import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { ProdutoGrupoController } from "./crud.controller";
import { ProdutoGrupo } from "./crud.entity";
import { ProdutoGrupoUser } from "./crud-user.entity";
import { ProdutoGrupoUserController } from "./crud-user.controller";
import { ProdutoGrupoService } from "./service";
import { ProdutoGrupoUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([ProdutoGrupo, ProdutoGrupoUser]),
        BaseCrudModule
    ],
    controllers:[ProdutoGrupoController, ProdutoGrupoUserController],
    providers:[ProdutoGrupoService, ProdutoGrupoUserService],
    exports:[ProdutoGrupoService, ProdutoGrupoUserService]
})
export class ProdutoGrupoModule {}