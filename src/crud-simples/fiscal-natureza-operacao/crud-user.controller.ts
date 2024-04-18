
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FiscalNaturezaOperacaoUserService } from "./crud-user.service";


@Controller('fiscal-natureza-operacao-user')
export class FiscalNaturezaOperacaoUserController extends BaseCrudController{
    constructor(public service: FiscalNaturezaOperacaoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}