import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { EmpresaService } from "./service";

@Controller('empresa')
export class EmpresaController extends BaseCrudController{
    constructor(public service: EmpresaService,
                protected userService: UserService,
                protected readonly http: HttpService) {
        super(service, userService, http)
    }
}