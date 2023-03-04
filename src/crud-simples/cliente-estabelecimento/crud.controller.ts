import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ClienteEstabelecimentoService } from "./service";

@Controller('cliente-estabelecimento')
export class ClienteEstabelecimentoController extends BaseCrudController{
    constructor(public service: ClienteEstabelecimentoService,
                protected userService: UserService) {
        super(service, userService)
    }
}