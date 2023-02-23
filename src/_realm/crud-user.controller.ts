import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { RealmUserService } from "./crud-user.service";


@Controller('realm-user')
export class RealmUserController extends BaseCrudController{
    constructor(public service: RealmUserService,
        protected userService: UserService,
        protected readonly http: HttpService) {
super(service, userService, http)
    }
}