import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { GrupoAcessoModuloSistemaService } from "./service";

@Controller('grupo-acesso-modulo-sistema')
export class GrupoAcessoModuloSistemaController extends BaseCrudController{
    constructor(public service: GrupoAcessoModuloSistemaService,
                protected userService: UserService) {
        super(service, userService)
    }
}