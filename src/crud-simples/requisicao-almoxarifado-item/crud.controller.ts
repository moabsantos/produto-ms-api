import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RequisicaoAlmoxarifadoItemService } from "./service";

@Controller('requisicao-almoxarifado-item')
export class RequisicaoAlmoxarifadoItemController extends BaseCrudController{
    constructor(public service: RequisicaoAlmoxarifadoItemService,
                protected userService: UserService) {
        super(service, userService)
    }
}