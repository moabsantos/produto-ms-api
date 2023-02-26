
import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { GrupoAcessoUserService } from "./crud-user.service";


@Controller('grupo-acesso-user')
export class GrupoAcessoUserController extends BaseCrudController{
    constructor(public service: GrupoAcessoUserService,
        protected userService: UserService,
        protected readonly http: HttpService) {
super(service, userService, http)
    }
}