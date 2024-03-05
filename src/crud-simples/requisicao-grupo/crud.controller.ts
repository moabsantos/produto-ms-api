import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RequisicaoGrupoService } from "./service";

@Controller('requisicao-grupo')
export class RequisicaoGrupoController extends BaseCrudController{
    constructor(public service: RequisicaoGrupoService,
                protected userService: UserService) {
        super(service, userService)
    }
}