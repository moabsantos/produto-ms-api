
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PrioridadeUserService } from "./crud-user.service";


@Controller('prioridade-user')
export class PrioridadeUserController extends BaseCrudController{
    constructor(public service: PrioridadeUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}