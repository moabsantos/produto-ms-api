import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RepresentanteUsuarioService } from "./service";

@Controller('representante-usuario')
export class RepresentanteUsuarioController extends BaseCrudController{
    constructor(public service: RepresentanteUsuarioService,
                protected userService: UserService) {
        super(service, userService)
    }
}