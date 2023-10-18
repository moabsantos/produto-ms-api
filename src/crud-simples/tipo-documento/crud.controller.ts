import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { TipoDocumentoService } from "./service";

@Controller('tipo-documento')
export class TipoDocumentoController extends BaseCrudController{
    constructor(public service: TipoDocumentoService,
                protected userService: UserService) {
        super(service, userService)
    }
}