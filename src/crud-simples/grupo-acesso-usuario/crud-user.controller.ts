
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { GrupoAcessoUsuarioUserService } from "./crud-user.service";


@Controller('grupo-acesso-usuario-user')
export class GrupoAcessoUsuarioUserController extends BaseCrudController{
    constructor(public service: GrupoAcessoUsuarioUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}