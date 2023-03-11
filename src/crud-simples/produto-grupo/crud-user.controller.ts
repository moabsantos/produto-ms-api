
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ProdutoGrupoUserService } from "./crud-user.service";


@Controller('produto-grupo-user')
export class ProdutoGrupoUserController extends BaseCrudController{
    constructor(public service: ProdutoGrupoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}