
import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { CustosDiaUserService } from "./crud-user.service";


@Controller('custos-dia-user')
export class CustosDiaUserController extends BaseCrudController{
    constructor(public service: CustosDiaUserService,
        protected userService: UserService,
        protected readonly http: HttpService) {
super(service, userService, http)
    }
}