
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RepresentanteUsuarioUserService } from "./crud-user.service";


@Controller('representante-usuario-user')
export class RepresentanteUsuarioUserController extends BaseCrudController{
    constructor(public service: RepresentanteUsuarioUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}