
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { CustosMensaisUserService } from "./crud-user.service";


@Controller('custos-mensais-user')
export class CustosMensaisUserController extends BaseCrudController{
    constructor(public service: CustosMensaisUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}