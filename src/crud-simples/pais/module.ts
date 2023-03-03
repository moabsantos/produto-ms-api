import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { PaisController } from "./crud.controller";
import { Pais } from "./crud.entity";
import { PaisUser } from "./crud-user.entity";
import { PaisUserController } from "./crud-user.controller";
import { PaisService } from "./service";
import { PaisUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([Pais, PaisUser]),
        BaseCrudModule
    ],
    controllers:[PaisController, PaisUserController],
    providers:[PaisService, PaisUserService],
    exports:[PaisService, PaisUserService]
})
export class PaisModule {}