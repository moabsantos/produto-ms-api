import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { OrdemProducaoItemService } from "./service";

@Controller('ordem-producao-item')
export class OrdemProducaoItemController extends BaseCrudController{
    constructor(public service: OrdemProducaoItemService,
                protected userService: UserService) {
        super(service, userService)
    }
}