
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ProdutoMaterialUserService } from "./crud-user.service";


@Controller('produto-material-user')
export class ProdutoMaterialUserController extends BaseCrudController{
    constructor(public service: ProdutoMaterialUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}