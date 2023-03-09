import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { OrdemProducaoUserService } from "./crud-user.service";


@Controller('ordem-producao-user')
export class OrdemProducaoUserController extends BaseCrudController{
    constructor(public service: OrdemProducaoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}