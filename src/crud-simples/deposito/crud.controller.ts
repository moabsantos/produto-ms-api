import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DepositoService } from "./service";

@Controller('deposito')
export class DepositoController extends BaseCrudController{
    constructor(public service: DepositoService,
                protected userService: UserService) {
        super(service, userService)
    }
}