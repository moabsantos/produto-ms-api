
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PaisUserService } from "./crud-user.service";


@Controller('pais-user')
export class PaisUserController extends BaseCrudController{
    constructor(public service: PaisUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}