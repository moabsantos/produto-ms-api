
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FiscalNfeFacadeUserService } from "./crud-user.service";


@Controller('fiscal-nfe-gateway-user')
export class FiscalNfeFacadeUserController extends BaseCrudController{
    constructor(public service: FiscalNfeFacadeUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}