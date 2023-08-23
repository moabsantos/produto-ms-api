import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DepositoInventarioService } from "./service";

@Controller('deposito-inventario')
export class DepositoInventarioController extends BaseCrudController{
    constructor(public service: DepositoInventarioService,
                protected userService: UserService) {
        super(service, userService)
    }
}