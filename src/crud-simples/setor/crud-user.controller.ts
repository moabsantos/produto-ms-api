
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { SetorUserService } from "./crud-user.service";


@Controller('setor-user')
export class SetorUserController extends BaseCrudController{
    constructor(public service: SetorUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}