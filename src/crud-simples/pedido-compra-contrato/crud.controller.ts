import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoCompraContratoService } from "./service";

@Controller('pedido-compra-contrato')
export class PedidoCompraContratoController extends BaseCrudController{
    constructor(public service: PedidoCompraContratoService,
                protected userService: UserService) {
        super(service, userService)
    }


}