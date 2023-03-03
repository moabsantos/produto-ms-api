import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FormaPagamentoService } from "./service";

@Controller('forma-pagamento')
export class FormaPagamentoController extends BaseCrudController{
    constructor(public service: FormaPagamentoService,
                protected userService: UserService) {
        super(service, userService)
    }
}