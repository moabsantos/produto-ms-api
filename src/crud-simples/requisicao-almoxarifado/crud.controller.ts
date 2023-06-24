import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RequisicaoAlmoxarifadoService } from "./service";

@Controller('requisicao-almoxarifado')
export class RequisicaoAlmoxarifadoController extends BaseCrudController{
    constructor(public service: RequisicaoAlmoxarifadoService,
                protected userService: UserService) {
        super(service, userService)
    }
}