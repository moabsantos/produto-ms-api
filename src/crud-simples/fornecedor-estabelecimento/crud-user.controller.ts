import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FornecedorEstabelecimentoUserService } from "./crud-user.service";


@Controller('fornecedor-estabelecimento-user')
export class FornecedorEstabelecimentoUserController extends BaseCrudController{
    constructor(public service: FornecedorEstabelecimentoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}