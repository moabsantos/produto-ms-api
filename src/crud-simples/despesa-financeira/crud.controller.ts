import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DespesaFinanceiraService } from "./service";

@Controller('despesa-financeira')
export class DespesaFinanceiraController extends BaseCrudController{
    constructor(public service: DespesaFinanceiraService,
                protected userService: UserService) {
        super(service, userService)
    }
}