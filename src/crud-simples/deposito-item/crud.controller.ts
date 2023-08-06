import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DepositoItemService } from "./service";

@Controller('deposito-item')
export class DepositoItemController extends BaseCrudController{
    constructor(public service: DepositoItemService,
                protected userService: UserService) {
        super(service, userService)
    }
}