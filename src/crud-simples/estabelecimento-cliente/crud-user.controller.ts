import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { EstabelecimentoClienteUserService } from "./crud-user.service";


@Controller('estabelecimento-cliente-user')
export class EstabelecimentoClienteUserController extends BaseCrudController{
    constructor(public service: EstabelecimentoClienteUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}