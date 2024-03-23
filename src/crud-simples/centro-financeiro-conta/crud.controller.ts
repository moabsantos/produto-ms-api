import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { CentroFinanceiroContaService } from "./service";

@Controller('centro-financeiro-conta')
export class CentroFinanceiroContaController extends BaseCrudController{
    constructor(public service: CentroFinanceiroContaService,
                protected userService: UserService) {
        super(service, userService)
    }
}