import { Body, Controller, HttpException, HttpStatus, Post, UseInterceptors } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RequisicaoCompraItemService } from "./service";
import { CrudRequest, CrudRequestInterceptor, ParsedRequest } from "@nestjsx/crud";
import { UserRequest } from "src/_auth/user.decorator";

@Controller('requisicao-compra-item')
export class RequisicaoCompraItemController extends BaseCrudController{
    constructor(public service: RequisicaoCompraItemService,
                protected userService: UserService) {
        super(service, userService)
    }

    @Post('aprovacao/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async aprovacaoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.aprovacaoFullList(req, user, body.requisicaoCompraId)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

    @Post('cancelar-aprovacao/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async cancelarAprovacaoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.cancelarAprovacaoFullList(req, user, body.requisicaoCompraId)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

    @Post('pedido/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async pedidoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.pedidoFullList(req, user, body.requisicaoCompraId)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

    @Post('cancelar-pedido/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async cancelarPedidoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.cancelarPedidoFullList(req, user, body.requisicaoCompraId)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }
}