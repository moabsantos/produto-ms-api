import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { PedidoStatusController } from "./crud.controller";
import { PedidoStatus } from "./crud.entity";
import { PedidoStatusUser } from "./crud-user.entity";
import { PedidoStatusUserController } from "./crud-user.controller";
import { PedidoStatusService } from "./service";
import { PedidoStatusUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([PedidoStatus, PedidoStatusUser]),
        BaseCrudModule
    ],
    controllers:[PedidoStatusController, PedidoStatusUserController],
    providers:[PedidoStatusService, PedidoStatusUserService],
    exports:[PedidoStatusService, PedidoStatusUserService]
})
export class PedidoStatusModule {}