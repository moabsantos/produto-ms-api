import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FiscalNfeFacadeService } from "./service";

@Controller('fiscal-nfe-gateway')
export class FiscalNfeFacadeController extends BaseCrudController{
    constructor(public service: FiscalNfeFacadeService,
                protected userService: UserService) {
        super(service, userService)
    }
}