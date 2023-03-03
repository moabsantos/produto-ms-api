import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PaisService } from "./service";

@Controller('pais')
export class PaisController extends BaseCrudController{
    constructor(public service: PaisService,
                protected userService: UserService) {
        super(service, userService)
    }
}