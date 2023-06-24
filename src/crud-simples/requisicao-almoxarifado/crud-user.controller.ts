
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RequisicaoAlmoxarifadoUserService } from "./crud-user.service";


@Controller('requisicao-almoxarifado-user')
export class RequisicaoAlmoxarifadoUserController extends BaseCrudController{
    constructor(public service: RequisicaoAlmoxarifadoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}