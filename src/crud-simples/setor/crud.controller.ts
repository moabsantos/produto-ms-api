import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { SetorService } from "./service";

@Controller('setor')
export class SetorController extends BaseCrudController{
    constructor(public service: SetorService,
                protected userService: UserService,
                protected readonly http: HttpService) {
        super(service, userService, http)
    }
}