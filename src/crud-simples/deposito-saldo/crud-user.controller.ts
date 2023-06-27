
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DepositoSaldoUserService } from "./crud-user.service";


@Controller('deposito-saldo-user')
export class DepositoSaldoUserController extends BaseCrudController{
    constructor(public service: DepositoSaldoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}