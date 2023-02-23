import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { UnidadeMedidaService } from "./service";

@Controller('unidade-medida')
export class UnidadeMedidaController extends BaseCrudController{
    constructor(public service: UnidadeMedidaService,
                protected userService: UserService,
                protected readonly http: HttpService) {
        super(service, userService, http)
    }
}