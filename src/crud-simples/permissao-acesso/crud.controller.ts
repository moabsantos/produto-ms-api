import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { PermissaoAcessoService } from "./service";

@Controller('permissao-acesso')
export class PermissaoAcessoController extends BaseCrudController{
    constructor(public service: PermissaoAcessoService,
                protected userService: UserService) {
        super(service, userService)
    }
}