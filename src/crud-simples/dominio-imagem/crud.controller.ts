import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DominioImagemService } from "./service";

@Controller('dominio-imagem')
export class DominioImagemController extends BaseCrudController{
    constructor(public service: DominioImagemService,
                protected userService: UserService) {
        super(service, userService)
    }
}