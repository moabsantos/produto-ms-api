import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { CidadeController } from "./crud.controller";
import { Cidade } from "./crud.entity";
import { CidadeUser } from "./crud-user.entity";
import { CidadeUserController } from "./crud-user.controller";
import { CidadeService } from "./service";
import { CidadeUserService } from "./crud-user.service";
import { UFModule } from "../uf/module";
import { PaisModule } from "../pais/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        UFModule,
        PaisModule,
        
        TypeOrmModule.forFeature([Cidade, CidadeUser]),
        BaseCrudModule
    ],
    controllers:[CidadeController, CidadeUserController],
    providers:[CidadeService, CidadeUserService],
    exports:[CidadeService, CidadeUserService]
})
export class CidadeModule {}