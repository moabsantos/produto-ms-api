import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FornecedorService } from "./service";

@Controller('fornecedor')
export class FornecedorController extends BaseCrudController{
    constructor(public service: FornecedorService,
                protected userService: UserService) {
        super(service, userService)
    }
}