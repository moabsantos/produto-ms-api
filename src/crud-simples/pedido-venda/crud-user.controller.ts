import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoVendaUserService } from "./crud-user.service";


@Controller('pedido-venda-user')
export class PedidoVendaUserController extends BaseCrudController{
    constructor(public service: PedidoVendaUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}