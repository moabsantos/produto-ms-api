import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoVendaItemService } from "./service";

@Controller('pedido-venda-item')
export class PedidoVendaItemController extends BaseCrudController{
    constructor(public service: PedidoVendaItemService,
                protected userService: UserService) {
        super(service, userService)
    }
}