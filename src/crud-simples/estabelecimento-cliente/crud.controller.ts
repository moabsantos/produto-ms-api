import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { EstabelecimentoClienteService } from "./service";

@Controller('estabelecimento-cliente')
export class EstabelecimentoClienteController extends BaseCrudController{
    constructor(public service: EstabelecimentoClienteService,
                protected userService: UserService) {
        super(service, userService)
    }
}