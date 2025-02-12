import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ProdutoBaseService } from "./service";

@Controller('produto-base')
export class ProdutoBaseController extends BaseCrudController{
    constructor(public service: ProdutoBaseService,
                protected userService: UserService) {
        super(service, userService)
    }
}