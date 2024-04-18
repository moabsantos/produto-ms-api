import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FiscalNaturezaOperacaoService } from "./service";

@Controller('fiscal-natureza-operacao')
export class FiscalNaturezaOperacaoController extends BaseCrudController{
    constructor(public service: FiscalNaturezaOperacaoService,
                protected userService: UserService) {
        super(service, userService)
    }
}