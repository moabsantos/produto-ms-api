import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { ClienteService } from "./service";

@Controller('cliente')
export class ClienteController extends BaseCrudController{
    constructor(public service: ClienteService,
                protected userService: UserService) {
        super(service, userService)
    }
}