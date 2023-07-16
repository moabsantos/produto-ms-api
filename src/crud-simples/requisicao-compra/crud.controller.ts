import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RequisicaoCompraService } from "./service";

@Controller('requisicao-compra')
export class RequisicaoCompraController extends BaseCrudController{
    constructor(public service: RequisicaoCompraService,
                protected userService: UserService) {
        super(service, userService)
    }
}