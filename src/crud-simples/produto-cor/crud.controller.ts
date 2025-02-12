import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ProdutoCorService } from "./service";

@Controller('produto-cor')
export class ProdutoCorController extends BaseCrudController{
    constructor(public service: ProdutoCorService,
                protected userService: UserService) {
        super(service, userService)
    }
}