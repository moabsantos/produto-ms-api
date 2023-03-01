
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { EmpresaUserService } from "./crud-user.service";


@Controller('empresa-user')
export class EmpresaUserController extends BaseCrudController{
    constructor(public service: EmpresaUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}