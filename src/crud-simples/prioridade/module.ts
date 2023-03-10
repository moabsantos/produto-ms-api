import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { PrioridadeController } from "./crud.controller";
import { Prioridade } from "./crud.entity";
import { PrioridadeUser } from "./crud-user.entity";
import { PrioridadeUserController } from "./crud-user.controller";
import { PrioridadeService } from "./service";
import { PrioridadeUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([Prioridade, PrioridadeUser]),
        BaseCrudModule
    ],
    controllers:[PrioridadeController, PrioridadeUserController],
    providers:[PrioridadeService, PrioridadeUserService],
    exports:[PrioridadeService, PrioridadeUserService]
})
export class PrioridadeModule {}