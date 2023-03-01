
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { PermissaoAcessoUserService } from "./crud-user.service";


@Controller('permissao-acesso-user')
export class PermissaoAcessoUserController extends BaseCrudController{
    constructor(public service: PermissaoAcessoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}