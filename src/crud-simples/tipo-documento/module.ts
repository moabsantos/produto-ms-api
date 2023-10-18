import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { HttpModule } from "@nestjs/axios/dist/http.module";
import { UserModule } from "src/_user/user.module";

import { TipoDocumentoController } from "./crud.controller";
import { TipoDocumento } from "./crud.entity";
import { TipoDocumentoUser } from "./crud-user.entity";
import { TipoDocumentoUserController } from "./crud-user.controller";
import { TipoDocumentoService } from "./service";
import { TipoDocumentoUserService } from "./crud-user.service";

@Module({
    imports: [
        HttpModule,
        UserModule,

        TypeOrmModule.forFeature([TipoDocumento, TipoDocumentoUser]),
        BaseCrudModule
    ],
    controllers:[TipoDocumentoController, TipoDocumentoUserController],
    providers:[TipoDocumentoService, TipoDocumentoUserService],
    exports:[TipoDocumentoService, TipoDocumentoUserService]
})
export class TipoDocumentoModule {}