
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RequisicaoCompraItemUserService } from "./crud-user.service";


@Controller('requisicao-compra-item-user')
export class RequisicaoCompraItemUserController extends BaseCrudController{
    constructor(public service: RequisicaoCompraItemUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}