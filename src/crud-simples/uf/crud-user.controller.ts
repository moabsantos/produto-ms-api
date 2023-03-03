import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { UFUserService } from "./crud-user.service";


@Controller('uf-user')
export class UFUserController extends BaseCrudController{
    constructor(public service: UFUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}