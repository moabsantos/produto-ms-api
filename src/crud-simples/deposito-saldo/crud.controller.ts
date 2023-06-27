import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DepositoSaldoService } from "./service";

@Controller('deposito-saldo')
export class DepositoSaldoController extends BaseCrudController{
    constructor(public service: DepositoSaldoService,
                protected userService: UserService) {
        super(service, userService)
    }
}