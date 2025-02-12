import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ProdutoMaterialService } from "./service";

@Controller('produto-material')
export class ProdutoMaterialController extends BaseCrudController{
    constructor(public service: ProdutoMaterialService,
                protected userService: UserService) {
        super(service, userService)
    }
}