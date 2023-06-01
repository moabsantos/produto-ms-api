import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { ProdutoPrecoService } from "./service";

@Controller('produto-preco')
export class ProdutoPrecoController extends BaseCrudController{
    constructor(public service: ProdutoPrecoService,
                protected userService: UserService) {
        super(service, userService)
    }
}