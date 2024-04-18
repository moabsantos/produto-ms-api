import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FiscalSerieService } from "./service";

@Controller('fiscal-serie')
export class FiscalSerieController extends BaseCrudController{
    constructor(public service: FiscalSerieService,
                protected userService: UserService) {
        super(service, userService)
    }
}