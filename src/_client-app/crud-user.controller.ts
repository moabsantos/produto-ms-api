import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { ClientAppUserService } from "./crud-user.service";


@Controller('client-app-user')
export class ClientAppUserController extends BaseCrudController{
    constructor(public service: ClientAppUserService,
        protected userService: UserService,
        protected readonly http: HttpService) {
super(service, userService, http)
    }
}