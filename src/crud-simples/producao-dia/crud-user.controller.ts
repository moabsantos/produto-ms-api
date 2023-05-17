
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ProducaoDiaUserService } from "./crud-user.service";


@Controller('producao-dia-user')
export class ProducaoDiaUserController extends BaseCrudController{
    constructor(public service: ProducaoDiaUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}