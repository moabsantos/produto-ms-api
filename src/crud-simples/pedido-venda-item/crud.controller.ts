import { Body, Controller, HttpException, HttpStatus, Post, UseInterceptors } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoVendaItemService } from "./service";
import { CrudRequest, CrudRequestInterceptor, ParsedRequest } from "@nestjsx/crud";
import { UserRequest } from "src/_auth/user.decorator";

@Controller('pedido-venda-item')
export class PedidoVendaItemController extends BaseCrudController{
    constructor(public service: PedidoVendaItemService,
                protected userService: UserService) {
        super(service, userService)
    }

    @Post('finaliza-digitacao/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async finalizaDigitacaoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        return await this.service.finalizaDigitacaoItens(req, user, body)

    }

    @Post('aprovacao/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async aprovacaoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        return await this.service.aprovaItens(req, user, body)

    }

    @Post('cancelar-aprovacao/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async cancelaAprovacaoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        return await this.service.cancelaAprovacaoItens(req, user, body)

    }

    @Post('solicitar-ordem/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async solicitarOrdemFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        return this.service.solicitarOrdemItens(req, user, body)

    }

    @Post('cancelar-ordem/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async cancelaOrdemFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        return this.service.cancelarOrdemItens(req, user, body)

    }

    @Post('separar/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async separarFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        return this.service.separarItens(req, user, body)

    }

    @Post('cancelar-separacao/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async cancelaSeparacaoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        return this.service.cancelarSeparacaoItens(req, user, body)

    }

    @Post('entregar/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async entregarFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        return this.service.entregarItens(req, user, body)

    }

    @Post('cancelar-entrega/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async cancelarEntregaFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        return this.service.cancelarEntregaItens(req, user, body)

    }

    @Post('cancelar/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async cancelarFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        return this.service.cancelarItens(req, user, body)

    }

    @Post('cancelar-cancelamento/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async cancelarCancelamentoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        return this.service.cancelarCancelamentoItens(req, user, body)

    }
}