import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoTipoService } from "./service";

@Controller('pedido-tipo')
export class PedidoTipoController extends BaseCrudController{
    constructor(public service: PedidoTipoService,
                protected userService: UserService) {
        super(service, userService)
    }
}