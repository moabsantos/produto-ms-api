
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ProdutoBaseUserService } from "./crud-user.service";


@Controller('produto-base-user')
export class ProdutoBaseUserController extends BaseCrudController{
    constructor(public service: ProdutoBaseUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}