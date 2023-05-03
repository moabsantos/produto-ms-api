import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DepositoRequisicaoService } from "./service";

@Controller('deposito-requisicao')
export class DepositoRequisicaoController extends BaseCrudController{
    constructor(public service: DepositoRequisicaoService,
                protected userService: UserService) {
        super(service, userService)
    }
}