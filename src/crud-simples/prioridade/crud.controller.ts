import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PrioridadeService } from "./service";

@Controller('prioridade')
export class PrioridadeController extends BaseCrudController{
    constructor(public service: PrioridadeService,
                protected userService: UserService) {
        super(service, userService)
    }
}