import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { DepositoController } from "./crud.controller";
import { Deposito } from "./crud.entity";
import { DepositoUser } from "./crud-user.entity";
import { DepositoUserController } from "./crud-user.controller";
import { DepositoService } from "./service";
import { DepositoUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([Deposito, DepositoUser]),
        BaseCrudModule
    ],
    controllers:[DepositoController, DepositoUserController],
    providers:[DepositoService, DepositoUserService],
    exports:[DepositoService, DepositoUserService]
})
export class DepositoModule {}