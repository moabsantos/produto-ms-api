import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { FiscalSerieController } from "./crud.controller";
import { FiscalSerie } from "./crud.entity";
import { FiscalSerieUser } from "./crud-user.entity";
import { FiscalSerieUserController } from "./crud-user.controller";
import { FiscalSerieService } from "./service";
import { FiscalSerieUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([FiscalSerie, FiscalSerieUser]),
        BaseCrudModule
    ],
    controllers:[FiscalSerieController, FiscalSerieUserController],
    providers:[FiscalSerieService, FiscalSerieUserService],
    exports:[FiscalSerieService, FiscalSerieUserService]
})
export class FiscalSerieModule {}