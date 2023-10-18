
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { TipoDocumentoUserService } from "./crud-user.service";


@Controller('tipo-documento-user')
export class TipoDocumentoUserController extends BaseCrudController{
    constructor(public service: TipoDocumentoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}