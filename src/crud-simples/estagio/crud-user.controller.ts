
import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { EstagioUserService } from "./crud-user.service";


@Controller('estagio-user')
export class EstagioUserController extends BaseCrudController{
    constructor(public service: EstagioUserService,
        protected userService: UserService,
        protected readonly http: HttpService) {
super(service, userService, http)
    }
}