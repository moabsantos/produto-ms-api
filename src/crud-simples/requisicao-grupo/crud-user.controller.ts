
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RequisicaoGrupoUserService } from "./crud-user.service";


@Controller('requisicao-grupo-user')
export class RequisicaoGrupoUserController extends BaseCrudController{
    constructor(public service: RequisicaoGrupoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}