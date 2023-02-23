import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FichaTecnicaController } from "./crud.controller";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";
import { FichaTecnica } from "./crud.entity";
import { FichaTecnicaUser } from "./crud-user.entity";
import { FichaTecnicaService } from "./service";
import { FichaTecnicaUserService } from "./crud-user.service";
import { FichaTecnicaUserController } from "./crud-user.controller";
import { UnidadeMedidaModule } from "../unidade-medida/module";


@Module({
    imports: [
        HttpModule,
        
        TypeOrmModule.forFeature([FichaTecnica, FichaTecnicaUser]),
        BaseCrudModule,

        UserModule,
        UnidadeMedidaModule
    ],
    controllers:[FichaTecnicaController, FichaTecnicaUserController],
    providers:[FichaTecnicaService, FichaTecnicaUserService],
    exports:[FichaTecnicaService, FichaTecnicaUserService]
})
export class FichaTecnicaModule {}