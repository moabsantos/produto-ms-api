import { HttpModule } from "@nestjs/axios/dist/http.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { UserModule } from "src/_user/user.module";
import { ClientAppUserController } from "./crud-user.controller";
import { ClientAppUser } from "./crud-user.entity";
import { ClientAppUserService } from "./crud-user.service";
import { ClientAppController } from "./crud.controller";
import { ClientApp } from "./crud.entity";
import { ClientAppService } from "./crud.service";


@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([ClientApp, ClientAppUser]),
        BaseCrudModule
    ],
    controllers:[ClientAppController, ClientAppUserController],
    providers:[ClientAppService, ClientAppUserService],
    exports:[ClientAppService, ClientAppUserService]
})
export class ClientAppModule {}