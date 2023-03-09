import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { OrdemProducaoItemUserService } from "./crud-user.service";


@Controller('ordem-producao-item-user')
export class OrdemProducaoItemUserController extends BaseCrudController{
    constructor(public service: OrdemProducaoItemUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}