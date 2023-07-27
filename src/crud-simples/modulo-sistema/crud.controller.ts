import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { ModuloSistemaService } from "./service";

@Controller('modulo-sistema')
export class ModuloSistemaController extends BaseCrudController{
    constructor(public service: ModuloSistemaService,
                protected userService: UserService) {
        super(service, userService)
    }
}