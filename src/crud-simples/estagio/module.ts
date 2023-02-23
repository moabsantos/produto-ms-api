import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EstagioController } from "./crud.controller";
import { Estagio } from "./crud.entity";
import { EstagioUser } from "./crud-user.entity";
import { EstagioUserController } from "./crud-user.controller";
import { EstagioService } from "./service";
import { EstagioUserService } from "./crud-user.service";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";


@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([Estagio, EstagioUser]),
        BaseCrudModule
    ],
    controllers:[EstagioController, EstagioUserController],
    providers:[EstagioService, EstagioUserService],
    exports:[EstagioService, EstagioUserService]
})
export class EstagioModule {}