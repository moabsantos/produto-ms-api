import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { ProdutoComponenteService } from "./service";

@Controller('produto-componente')
export class ProdutoComponenteController extends BaseCrudController{
    constructor(public service: ProdutoComponenteService,
                protected userService: UserService) {
        super(service, userService)
    }
}