
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ClienteUserService } from "./crud-user.service";


@Controller('cliente-user')
export class ClienteUserController extends BaseCrudController{
    constructor(public service: ClienteUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}