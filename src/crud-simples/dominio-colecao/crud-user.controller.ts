
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DominioColecaoUserService } from "./crud-user.service";


@Controller('dominio-colecao-user')
export class DominioColecaoUserController extends BaseCrudController{
    constructor(public service: DominioColecaoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}