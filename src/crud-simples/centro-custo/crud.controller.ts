import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { CentroCustoService } from "./service";

@Controller('centro-custo')
export class CentroCustoController extends BaseCrudController{
    constructor(public service: CentroCustoService,
                protected userService: UserService) {
        super(service, userService)
    }
}