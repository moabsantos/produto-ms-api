
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RepresentanteUserService } from "./crud-user.service";


@Controller('representante-user')
export class RepresentanteUserController extends BaseCrudController{
    constructor(public service: RepresentanteUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}