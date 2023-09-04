import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { DominioColecaoController } from "./crud.controller";
import { DominioColecao } from "./crud.entity";
import { DominioColecaoUser } from "./crud-user.entity";
import { DominioColecaoUserController } from "./crud-user.controller";
import { DominioColecaoService } from "./service";
import { DominioColecaoUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,

        TypeOrmModule.forFeature([DominioColecao, DominioColecaoUser]),
        BaseCrudModule
    ],
    controllers:[DominioColecaoController, DominioColecaoUserController],
    providers:[DominioColecaoService, DominioColecaoUserService],
    exports:[DominioColecaoService, DominioColecaoUserService]
})
export class DominioColecaoModule {}