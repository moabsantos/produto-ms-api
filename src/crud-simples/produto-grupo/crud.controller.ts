import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ProdutoGrupoService } from "./service";

@Controller('produto-grupo')
export class ProdutoGrupoController extends BaseCrudController{
    constructor(public service: ProdutoGrupoService,
                protected userService: UserService) {
        super(service, userService)
    }
}