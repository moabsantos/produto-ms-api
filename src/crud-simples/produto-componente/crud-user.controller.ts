
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { ProdutoComponenteUserService } from "./crud-user.service";




@Controller('produto-componente-user')
export class ProdutoComponenteUserController extends BaseCrudController{
    constructor(public service: ProdutoComponenteUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}