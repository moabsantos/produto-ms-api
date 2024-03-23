
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { CentroFinanceiroUserService } from "./crud-user.service";


@Controller('centro-financeiro-user')
export class CentroFinanceiroUserController extends BaseCrudController{
    constructor(public service: CentroFinanceiroUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}