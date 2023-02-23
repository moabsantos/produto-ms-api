import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { ProdutoService } from "./service";

@Controller('produto')
export class ProdutoController extends BaseCrudController{
    constructor(public service: ProdutoService,
                protected userService: UserService,
                protected readonly http: HttpService) {
        super(service, userService, http)
    }
}