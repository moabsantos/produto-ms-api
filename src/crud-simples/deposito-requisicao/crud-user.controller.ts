
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DepositoRequisicaoUserService } from "./crud-user.service";


@Controller('deposito-requisicao-user')
export class DepositoRequisicaoUserController extends BaseCrudController{
    constructor(public service: DepositoRequisicaoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}