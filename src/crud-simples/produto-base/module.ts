import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { ProdutoBaseController } from "./crud.controller";
import { ProdutoBase } from "./crud.entity";
import { ProdutoBaseUser } from "./crud-user.entity";
import { ProdutoBaseUserController } from "./crud-user.controller";
import { ProdutoBaseService } from "./service";
import { ProdutoBaseUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([ProdutoBase, ProdutoBaseUser]),
        BaseCrudModule
    ],
    controllers:[ProdutoBaseController, ProdutoBaseUserController],
    providers:[ProdutoBaseService, ProdutoBaseUserService],
    exports:[ProdutoBaseService, ProdutoBaseUserService]
})
export class ProdutoBaseModule {}