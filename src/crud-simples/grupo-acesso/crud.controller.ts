import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { GrupoAcessoService } from "./service";

@Controller('grupo-acesso')
export class GrupoAcessoController extends BaseCrudController{
    constructor(public service: GrupoAcessoService,
                protected userService: UserService) {
        super(service, userService)
    }
}