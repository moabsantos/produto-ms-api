import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { PedidoTipoController } from "./crud.controller";
import { PedidoTipo } from "./crud.entity";
import { PedidoTipoUser } from "./crud-user.entity";
import { PedidoTipoUserController } from "./crud-user.controller";
import { PedidoTipoService } from "./service";
import { PedidoTipoUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([PedidoTipo, PedidoTipoUser]),
        BaseCrudModule
    ],
    controllers:[PedidoTipoController, PedidoTipoUserController],
    providers:[PedidoTipoService, PedidoTipoUserService],
    exports:[PedidoTipoService, PedidoTipoUserService]
})
export class PedidoTipoModule {}