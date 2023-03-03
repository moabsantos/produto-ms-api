import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { ClienteController } from "./crud.controller";
import { Cliente } from "./crud.entity";
import { ClienteUser } from "./crud-user.entity";
import { ClienteUserController } from "./crud-user.controller";
import { ClienteService } from "./service";
import { ClienteUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([Cliente, ClienteUser]),
        BaseCrudModule
    ],
    controllers:[ClienteController, ClienteUserController],
    providers:[ClienteService, ClienteUserService],
    exports:[ClienteService, ClienteUserService]
})
export class ClienteModule {}