import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoVendaItemUserService } from "./crud-user.service";


@Controller('pedido-venda-item-user')
export class PedidoVendaItemUserController extends BaseCrudController{
    constructor(public service: PedidoVendaItemUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}