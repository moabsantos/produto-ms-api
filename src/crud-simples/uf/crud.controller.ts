import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { UFService } from "./service";

@Controller('uf')
export class UFController extends BaseCrudController{
    constructor(public service: UFService,
                protected userService: UserService) {
        super(service, userService)
    }
}