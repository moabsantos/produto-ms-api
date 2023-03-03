import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { CidadeService } from "./service";

@Controller('cidade')
export class CidadeController extends BaseCrudController{
    constructor(public service: CidadeService,
                protected userService: UserService) {
        super(service, userService)
    }
}