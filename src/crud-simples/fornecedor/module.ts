import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { FornecedorController } from "./crud.controller";
import { Fornecedor } from "./crud.entity";
import { FornecedorUser } from "./crud-user.entity";
import { FornecedorUserController } from "./crud-user.controller";
import { FornecedorService } from "./service";
import { FornecedorUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([Fornecedor, FornecedorUser]),
        BaseCrudModule
    ],
    controllers:[FornecedorController, FornecedorUserController],
    providers:[FornecedorService, FornecedorUserService],
    exports:[FornecedorService, FornecedorUserService]
})
export class FornecedorModule {}