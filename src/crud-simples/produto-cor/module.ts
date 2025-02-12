import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { ProdutoCorController } from "./crud.controller";
import { ProdutoCor } from "./crud.entity";
import { ProdutoCorUser } from "./crud-user.entity";
import { ProdutoCorUserController } from "./crud-user.controller";
import { ProdutoCorService } from "./service";
import { ProdutoCorUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([ProdutoCor, ProdutoCorUser]),
        BaseCrudModule
    ],
    controllers:[ProdutoCorController, ProdutoCorUserController],
    providers:[ProdutoCorService, ProdutoCorUserService],
    exports:[ProdutoCorService, ProdutoCorUserService]
})
export class ProdutoCorModule {}