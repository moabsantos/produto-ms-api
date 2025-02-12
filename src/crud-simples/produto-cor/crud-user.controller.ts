
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ProdutoCorUserService } from "./crud-user.service";


@Controller('produto-cor-user')
export class ProdutoCorUserController extends BaseCrudController{
    constructor(public service: ProdutoCorUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}