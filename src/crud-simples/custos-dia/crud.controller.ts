import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { CustosDiaService } from "./service";

@Controller('custos-dia')
export class CustosDiaController extends BaseCrudController{
    constructor(public service: CustosDiaService,
                protected userService: UserService,
                protected readonly http: HttpService) {
        super(service, userService, http)
    }
}