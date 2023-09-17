
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ProdutoComponenteParteUserService } from "./crud-user.service";


@Controller('produto-componente-parte-user')
export class ProdutoComponenteParteUserController extends BaseCrudController{
    constructor(public service: ProdutoComponenteParteUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}