import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { UFController } from "./crud.controller";
import { UF } from "./crud.entity";
import { UFUser } from "./crud-user.entity";
import { UFUserController } from "./crud-user.controller";
import { UFService } from "./service";
import { UFUserService } from "./crud-user.service";
import { PaisModule } from "../pais/module";

@Module({
    imports: [
        HttpModule,

        UserModule,
        PaisModule,

        TypeOrmModule.forFeature([UF, UFUser]),
        BaseCrudModule
    ],
    controllers:[UFController, UFUserController],
    providers:[UFService, UFUserService],
    exports:[UFService, UFUserService]
})
export class UFModule {}