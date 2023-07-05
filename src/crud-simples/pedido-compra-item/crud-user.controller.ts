
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoCompraItemUserService } from "./crud-user.service";


@Controller('pedido-compra-item-user')
export class PedidoCompraItemUserController extends BaseCrudController{
    constructor(public service: PedidoCompraItemUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}