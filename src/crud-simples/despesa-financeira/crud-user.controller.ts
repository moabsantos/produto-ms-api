
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DespesaFinanceiraUserService } from "./crud-user.service";


@Controller('despesa-financeira-user')
export class DespesaFinanceiraUserController extends BaseCrudController{
    constructor(public service: DespesaFinanceiraUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}