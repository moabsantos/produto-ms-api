
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FiscalNfeProdutoUserService } from "./crud-user.service";


@Controller('fiscal-nfe-produto-user')
export class FiscalNfeProdutoUserController extends BaseCrudController{
    constructor(public service: FiscalNfeProdutoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}