
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { CentroCustoUserService } from "./crud-user.service";


@Controller('centro-custo-user')
export class CentroCustoUserController extends BaseCrudController{
    constructor(public service: CentroCustoUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}