import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { FichaTecnicaService } from "./service";

@Controller('ficha-tecnica')
export class FichaTecnicaController extends BaseCrudController{
    constructor(public service: FichaTecnicaService,
                protected userService: UserService) {
        super(service, userService)
    }
}