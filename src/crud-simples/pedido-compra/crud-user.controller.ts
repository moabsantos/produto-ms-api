
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoCompraUserService } from "./crud-user.service";


@Controller('pedido-compra-user')
export class PedidoCompraUserController extends BaseCrudController{
    constructor(public service: PedidoCompraUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}