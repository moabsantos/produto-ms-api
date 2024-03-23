
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { CentroFinanceiroContaUserService } from "./crud-user.service";


@Controller('centro-financeiro-conta-user')
export class CentroFinanceiroContaUserController extends BaseCrudController{
    constructor(public service: CentroFinanceiroContaUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}