import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { DepositoSaldoController } from "./crud.controller";
import { DepositoSaldo } from "./crud.entity";
import { DepositoSaldoUser } from "./crud-user.entity";
import { DepositoSaldoUserController } from "./crud-user.controller";
import { DepositoSaldoService } from "./service";
import { DepositoSaldoUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([DepositoSaldo, DepositoSaldoUser]),
        BaseCrudModule
    ],
    controllers:[DepositoSaldoController, DepositoSaldoUserController],
    providers:[DepositoSaldoService, DepositoSaldoUserService],
    exports:[DepositoSaldoService, DepositoSaldoUserService]
})
export class DepositoSaldoModule {}