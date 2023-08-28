
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RepresentanteClienteUserService } from "./crud-user.service";


@Controller('representante-cliente-user')
export class RepresentanteClienteUserController extends BaseCrudController{
    constructor(public service: RepresentanteClienteUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}