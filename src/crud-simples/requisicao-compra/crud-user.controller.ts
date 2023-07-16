
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RequisicaoCompraUserService } from "./crud-user.service";


@Controller('requisicao-compra-user')
export class RequisicaoCompraUserController extends BaseCrudController{
    constructor(public service: RequisicaoCompraUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}