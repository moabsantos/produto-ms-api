
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { ProdutoPrecoUserService } from "./crud-user.service";




@Controller('produto-preco-user')
export class ProdutoPrecoUserController extends BaseCrudController{
    constructor(public service: ProdutoPrecoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}