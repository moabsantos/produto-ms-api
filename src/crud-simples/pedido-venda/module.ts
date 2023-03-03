import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { PedidoVendaController } from "./crud.controller";
import { PedidoVenda } from "./crud.entity";
import { PedidoVendaUser } from "./crud-user.entity";
import { PedidoVendaUserController } from "./crud-user.controller";
import { PedidoVendaService } from "./service";
import { PedidoVendaUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([PedidoVenda, PedidoVendaUser]),
        BaseCrudModule
    ],
    controllers:[PedidoVendaController, PedidoVendaUserController],
    providers:[PedidoVendaService, PedidoVendaUserService],
    exports:[PedidoVendaService, PedidoVendaUserService]
})
export class PedidoVendaModule {}