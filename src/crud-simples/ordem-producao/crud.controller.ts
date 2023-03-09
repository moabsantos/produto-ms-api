import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { OrdemProducaoService } from "./service";

@Controller('ordem-producao')
export class OrdemProducaoController extends BaseCrudController{
    constructor(public service: OrdemProducaoService,
                protected userService: UserService) {
        super(service, userService)
    }
}
