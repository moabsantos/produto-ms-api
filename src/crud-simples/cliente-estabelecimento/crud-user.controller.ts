import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ClienteEstabelecimentoUserService } from "./crud-user.service";


@Controller('cliente-estabelecimento-user')
export class ClienteEstabelecimentoUserController extends BaseCrudController{
    constructor(public service: ClienteEstabelecimentoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}