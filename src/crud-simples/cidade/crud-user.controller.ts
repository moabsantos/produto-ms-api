import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { CidadeUserService } from "./crud-user.service";


@Controller('cidade-user')
export class CidadeUserController extends BaseCrudController{
    constructor(public service: CidadeUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}