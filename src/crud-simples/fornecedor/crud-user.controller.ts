import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FornecedorUserService } from "./crud-user.service";


@Controller('fornecedor-user')
export class FornecedorUserController extends BaseCrudController{
    constructor(public service: FornecedorUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}