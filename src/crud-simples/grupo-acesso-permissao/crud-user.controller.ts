
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { GrupoAcessoPermissaoUserService } from "./crud-user.service";


@Controller('grupo-acesso-permissao-user')
export class GrupoAcessoPermissaoUserController extends BaseCrudController{
    constructor(public service: GrupoAcessoPermissaoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}