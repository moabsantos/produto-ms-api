import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RepresentanteClienteService } from "./service";

@Controller('representante-cliente')
export class RepresentanteClienteController extends BaseCrudController{
    constructor(public service: RepresentanteClienteService,
                protected userService: UserService) {
        super(service, userService)
    }
}