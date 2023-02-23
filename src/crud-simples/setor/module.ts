import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { SetorController } from "./crud.controller";
import { Setor } from "./crud.entity";
import { SetorUser } from "./crud-user.entity";
import { SetorUserController } from "./crud-user.controller";
import { SetorService } from "./service";
import { SetorUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([Setor, SetorUser]),
        BaseCrudModule
    ],
    controllers:[SetorController, SetorUserController],
    providers:[SetorService, SetorUserService],
    exports:[SetorService, SetorUserService]
})
export class SetorModule {}