import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UnidadeMedidaController } from "./crud.controller";
import { UnidadeMedida } from "./crud.entity";
import { UnidadeMedidaUser } from "./crud-user.entity";
import { UnidadeMedidaUserController } from "./crud-user.controller";
import { UnidadeMedidaService } from "./service";
import { UnidadeMedidaUserService } from "./crud-user.service";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";


@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([UnidadeMedida, UnidadeMedidaUser]),
        BaseCrudModule
    ],
    controllers:[UnidadeMedidaController, UnidadeMedidaUserController],
    providers:[UnidadeMedidaService, UnidadeMedidaUserService],
    exports:[UnidadeMedidaService, UnidadeMedidaUserService]
})
export class UnidadeMedidaModule {}