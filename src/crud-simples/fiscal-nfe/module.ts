import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { FiscalNfeController } from "./crud.controller";
import { FiscalNfe } from "./crud.entity";
import { FiscalNfeUser } from "./crud-user.entity";
import { FiscalNfeUserController } from "./crud-user.controller";
import { FiscalNfeService } from "./service";
import { FiscalNfeUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([FiscalNfe, FiscalNfeUser]),
        BaseCrudModule
    ],
    controllers:[FiscalNfeController, FiscalNfeUserController],
    providers:[FiscalNfeService, FiscalNfeUserService],
    exports:[FiscalNfeService, FiscalNfeUserService]
})
export class FiscalNfeModule {}