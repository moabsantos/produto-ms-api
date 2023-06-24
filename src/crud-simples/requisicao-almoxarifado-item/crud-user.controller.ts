
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RequisicaoAlmoxarifadoItemUserService } from "./crud-user.service";


@Controller('requisicao-almoxarifado-item-user')
export class RequisicaoAlmoxarifadoItemUserController extends BaseCrudController{
    constructor(public service: RequisicaoAlmoxarifadoItemUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}