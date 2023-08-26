import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RepresentanteService } from "./service";

@Controller('representante')
export class RepresentanteController extends BaseCrudController{
    constructor(public service: RepresentanteService,
                protected userService: UserService) {
        super(service, userService)
    }
}