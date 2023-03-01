import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { ClientAppService } from "./crud.service";

@Controller('client-app')
export class ClientAppController extends BaseCrudController{
    constructor(public service: ClientAppService,
        protected userService: UserService) {
        super(service, userService)
    }
}