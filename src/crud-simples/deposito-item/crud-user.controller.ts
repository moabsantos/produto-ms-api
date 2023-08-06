
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DepositoItemUserService } from "./crud-user.service";


@Controller('deposito-item-user')
export class DepositoItemUserController extends BaseCrudController{
    constructor(public service: DepositoItemUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}