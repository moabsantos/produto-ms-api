
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DominioImagemUserService } from "./crud-user.service";


@Controller('dominio-imagem-user')
export class DominioImagemUserController extends BaseCrudController{
    constructor(public service: DominioImagemUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}