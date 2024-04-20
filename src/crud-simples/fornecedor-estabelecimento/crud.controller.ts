import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { FornecedorEstabelecimentoService } from "./service";
import { CrudRequest, CrudRequestInterceptor, ParsedRequest } from "@nestjsx/crud";
import { UserRequest } from "src/_auth/user.decorator";

@Controller('fornecedor-estabelecimento')
export class FornecedorEstabelecimentoController extends BaseCrudController{
    constructor(public service: FornecedorEstabelecimentoService,
                protected userService: UserService) {
        super(service, userService)
    }

    @Post('principal')
    @UseInterceptors(CrudRequestInterceptor)
    async setPrincipal(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        return await this.service.setPrincipal(req, user, body)

    }
}