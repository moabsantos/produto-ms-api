import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ProdutoComponenteParteService } from "./service";

@Controller('produto-componente-parte')
export class ProdutoComponenteParteController extends BaseCrudController{
    constructor(public service: ProdutoComponenteParteService,
                protected userService: UserService) {
        super(service, userService)
    }


}