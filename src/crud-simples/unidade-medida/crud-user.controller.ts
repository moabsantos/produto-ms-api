
import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { UnidadeMedidaUserService } from "./crud-user.service";


@Controller('unidade-medida-user')
export class UnidadeMedidaUserController extends BaseCrudController{
    constructor(public service: UnidadeMedidaUserService,
        protected userService: UserService,
        protected readonly http: HttpService) {
super(service, userService, http)
    }
}