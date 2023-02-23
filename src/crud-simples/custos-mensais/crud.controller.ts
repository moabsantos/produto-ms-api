import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { CustosMensaisService } from "./service";

@Controller('custos-mensais')
export class CustosMensaisController extends BaseCrudController{
    constructor(public service: CustosMensaisService,
                protected userService: UserService,
                protected readonly http: HttpService) {
        super(service, userService, http)
    }
}