
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoCompraContratoParcelaUserService } from "./crud-user.service";


@Controller('pedido-compra-contrato-parcela-user')
export class PedidoCompraContratoParcelaUserController extends BaseCrudController{
    constructor(public service: PedidoCompraContratoParcelaUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}