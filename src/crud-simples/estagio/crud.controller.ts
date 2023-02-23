import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { EstagioService } from "./service";

@Controller('estagio')
export class EstagioController extends BaseCrudController{
    constructor(public service: EstagioService,
                protected userService: UserService,
                protected readonly http: HttpService) {
        super(service, userService, http)
    }
}