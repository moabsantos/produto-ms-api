
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DepositoUserService } from "./crud-user.service";


@Controller('deposito-user')
export class DepositoUserController extends BaseCrudController{
    constructor(public service: DepositoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}