
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoTipoUserService } from "./crud-user.service";


@Controller('pedido-tipo-user')
export class PedidoTipoUserController extends BaseCrudController{
    constructor(public service: PedidoTipoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}