
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FiscalNfeUserService } from "./crud-user.service";


@Controller('fiscal-nfe-user')
export class FiscalNfeUserController extends BaseCrudController{
    constructor(public service: FiscalNfeUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}