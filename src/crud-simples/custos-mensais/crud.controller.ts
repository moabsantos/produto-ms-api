import { HttpService } from "@nestjs/axios";
import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { CrudRequest, ParsedRequest } from "@nestjsx/crud";
import { UserRequest } from "src/_auth/user.decorator";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { CustosMensaisService } from "./service";

@Controller('custos-mensais')
export class CustosMensaisController extends BaseCrudController{
    constructor(public service: CustosMensaisService,
                protected userService: UserService,
                protected readonly http: HttpService) {
        super(service, userService, http)
    }

    @Post()
    async createOne(@ParsedRequest() req: CrudRequest, @UserRequest() authToken: any, @Body() body: any){

        return {
            msgGeral: "Este cadastro deve ser feito pelo Facade",
            data: []
        }

    }
}