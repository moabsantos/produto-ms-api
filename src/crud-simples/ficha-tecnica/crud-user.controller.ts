
import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { FichaTecnicaUserService } from "./crud-user.service";



@Controller('ficha-tecnica-user')
export class FichaTecnicaUserController extends BaseCrudController{
    constructor(public service: FichaTecnicaUserService,
        protected userService: UserService,
        protected readonly http: HttpService) {
super(service, userService, http)
    }
}