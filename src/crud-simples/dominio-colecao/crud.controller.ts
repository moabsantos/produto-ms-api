import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DominioColecaoService } from "./service";

@Controller('dominio-colecao')
export class DominioColecaoController extends BaseCrudController{
    constructor(public service: DominioColecaoService,
                protected userService: UserService) {
        super(service, userService)
    }
}