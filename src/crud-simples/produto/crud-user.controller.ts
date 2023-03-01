
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { ProdutoUserService } from "./crud-user.service";



@Controller('produto-user')
export class ProdutoUserController extends BaseCrudController{
    constructor(public service: ProdutoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}