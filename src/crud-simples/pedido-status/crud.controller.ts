import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoStatusService } from "./service";

@Controller('prioridade')
export class PedidoStatusController extends BaseCrudController{
    constructor(public service: PedidoStatusService,
                protected userService: UserService) {
        super(service, userService)
    }
}