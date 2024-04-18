
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FiscalSerieUserService } from "./crud-user.service";


@Controller('fiscal-serie-user')
export class FiscalSerieUserController extends BaseCrudController{
    constructor(public service: FiscalSerieUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}