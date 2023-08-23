
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DepositoInventarioUserService } from "./crud-user.service";


@Controller('deposito-inventario-user')
export class DepositoInventarioUserController extends BaseCrudController{
    constructor(public service: DepositoInventarioUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}