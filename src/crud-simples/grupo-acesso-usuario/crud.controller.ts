import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { GrupoAcessoUsuarioService } from "./service";

@Controller('grupo-acesso-usuario')
export class GrupoAcessoUsuarioController extends BaseCrudController{
    constructor(public service: GrupoAcessoUsuarioService,
                protected userService: UserService) {
        super(service, userService)
    }
}