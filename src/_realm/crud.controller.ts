import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { RealmService } from "./crud.service";

@Controller('realm')
export class RealmController extends BaseCrudController{
    constructor(public service: RealmService,
        protected userService: UserService) {
        super(service, userService)
    }
}