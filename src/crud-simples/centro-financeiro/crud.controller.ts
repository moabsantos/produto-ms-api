import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { CentroFinanceiroService } from "./service";

@Controller('centro-financeiro')
export class CentroFinanceiroController extends BaseCrudController{
    constructor(public service: CentroFinanceiroService,
                protected userService: UserService) {
        super(service, userService)
    }
}