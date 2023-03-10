
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoStatusUserService } from "./crud-user.service";


@Controller('pedido-status-user')
export class PedidoStatusUserController extends BaseCrudController{
    constructor(public service: PedidoStatusUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}