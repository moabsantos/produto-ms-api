import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { DominioImagemController } from "./crud.controller";
import { DominioImagem } from "./crud.entity";
import { DominioImagemUser } from "./crud-user.entity";
import { DominioImagemUserController } from "./crud-user.controller";
import { DominioImagemService } from "./service";
import { DominioImagemUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,

        TypeOrmModule.forFeature([DominioImagem, DominioImagemUser]),
        BaseCrudModule
    ],
    controllers:[DominioImagemController, DominioImagemUserController],
    providers:[DominioImagemService, DominioImagemUserService],
    exports:[DominioImagemService, DominioImagemUserService]
})
export class DominioImagemModule {}