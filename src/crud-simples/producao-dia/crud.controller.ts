import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ProducaoDiaService } from "./service";

@Controller('producao-dia')
export class ProducaoDiaController extends BaseCrudController{
    constructor(public service: ProducaoDiaService,
                protected userService: UserService) {
        super(service, userService)
    }
}