import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { FiscalNfeFacadeController } from "./crud.controller";
import { FiscalNfeFacade } from "./crud.entity";
import { FiscalNfeFacadeUser } from "./crud-user.entity";
import { FiscalNfeFacadeUserController } from "./crud-user.controller";
import { FiscalNfeFacadeService } from "./service";
import { FiscalNfeFacadeUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([FiscalNfeFacade, FiscalNfeFacadeUser]),
        BaseCrudModule
    ],
    controllers:[FiscalNfeFacadeController, FiscalNfeFacadeUserController],
    providers:[FiscalNfeFacadeService, FiscalNfeFacadeUserService],
    exports:[FiscalNfeFacadeService, FiscalNfeFacadeUserService]
})
export class FiscalNfeFacadeModule {}