import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { ProdutoMaterialController } from "./crud.controller";
import { ProdutoMaterial } from "./crud.entity";
import { ProdutoMaterialUser } from "./crud-user.entity";
import { ProdutoMaterialUserController } from "./crud-user.controller";
import { ProdutoMaterialService } from "./service";
import { ProdutoMaterialUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([ProdutoMaterial, ProdutoMaterialUser]),
        BaseCrudModule
    ],
    controllers:[ProdutoMaterialController, ProdutoMaterialUserController],
    providers:[ProdutoMaterialService, ProdutoMaterialUserService],
    exports:[ProdutoMaterialService, ProdutoMaterialUserService]
})
export class ProdutoMaterialModule {}