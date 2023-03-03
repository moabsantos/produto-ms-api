import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoVendaService } from "./service";

@Controller('pedido-venda')
export class PedidoVendaController extends BaseCrudController{
    constructor(public service: PedidoVendaService,
                protected userService: UserService) {
        super(service, userService)
    }
}
