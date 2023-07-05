import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoCompraService } from "./service";

@Controller('pedido-compra')
export class PedidoCompraController extends BaseCrudController{
    constructor(public service: PedidoCompraService,
                protected userService: UserService) {
        super(service, userService)
    }
}