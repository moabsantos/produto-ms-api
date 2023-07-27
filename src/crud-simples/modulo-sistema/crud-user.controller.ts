
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { ModuloSistemaUserService } from "./crud-user.service";


@Controller('modulo-sistema-user')
export class ModuloSistemaUserController extends BaseCrudController{
    constructor(public service: ModuloSistemaUserService,
        protected userService: UserService) {
        super(service, userService)
    }
}