import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FiscalNfeService } from "./service";

@Controller('fiscal-nfe')
export class FiscalNfeController extends BaseCrudController{
    constructor(public service: FiscalNfeService,
                protected userService: UserService) {
        super(service, userService)
    }
}