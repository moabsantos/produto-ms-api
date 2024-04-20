import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FiscalNfeProdutoService } from "./service";

@Controller('fiscal-nfe-produto')
export class FiscalNfeProdutoController extends BaseCrudController{
    constructor(public service: FiscalNfeProdutoService,
                protected userService: UserService) {
        super(service, userService)
    }
}