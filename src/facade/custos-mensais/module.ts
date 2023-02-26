import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { CustosMensaisFacadeController } from "./controller";
import { CustosMensaisFacadeService } from "./service";

import { CustosDiaModule } from "src/crud-simples/custos-dia/module";
import { CustosMensaisModule } from "src/crud-simples/custos-mensais/module";

@Module({
    imports: [
        HttpModule,
        UserModule,

        BaseCrudModule,

        CustosDiaModule,
        CustosMensaisModule
    ],
    controllers:[CustosMensaisFacadeController],
    providers:[CustosMensaisFacadeService],
    exports:[CustosMensaisFacadeService]
})
export class CustosMensaisFacadeModule {}