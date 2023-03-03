import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FormaPagamentoUserService } from "./crud-user.service";


@Controller('forma-pagamento-user')
export class FormaPagamentoUserController extends BaseCrudController{
    constructor(public service: FormaPagamentoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}