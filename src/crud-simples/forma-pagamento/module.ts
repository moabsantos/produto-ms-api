import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { FormaPagamentoController } from "./crud.controller";
import { FormaPagamento } from "./crud.entity";
import { FormaPagamentoUser } from "./crud-user.entity";
import { FormaPagamentoUserController } from "./crud-user.controller";
import { FormaPagamentoService } from "./service";
import { FormaPagamentoUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,
        
        TypeOrmModule.forFeature([FormaPagamento, FormaPagamentoUser]),
        BaseCrudModule
    ],
    controllers:[FormaPagamentoController, FormaPagamentoUserController],
    providers:[FormaPagamentoService, FormaPagamentoUserService],
    exports:[FormaPagamentoService, FormaPagamentoUserService]
})
export class FormaPagamentoModule {}