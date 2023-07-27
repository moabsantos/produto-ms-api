
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { GrupoAcessoModuloSistemaUserService } from "./crud-user.service";


@Controller('grupo-acesso-modulo-sistema-user')
export class GrupoAcessoModuloSistemaUserController extends BaseCrudController{
    constructor(public service: GrupoAcessoModuloSistemaUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}