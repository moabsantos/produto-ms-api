import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { GrupoAcessoPermissaoService } from "./service";

@Controller('grupo-acesso-permissao')
export class GrupoAcessoPermissaoController extends BaseCrudController{
    constructor(public service: GrupoAcessoPermissaoService,
                protected userService: UserService) {
        super(service, userService)
    }
}