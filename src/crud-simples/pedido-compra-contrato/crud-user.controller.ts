
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoCompraContratoUserService } from "./crud-user.service";


@Controller('pedido-compra-contrato-user')
export class PedidoCompraContratoUserController extends BaseCrudController{
    constructor(public service: PedidoCompraContratoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}