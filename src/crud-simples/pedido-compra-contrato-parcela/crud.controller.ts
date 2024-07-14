import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseInterceptors } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { PedidoCompraContratoParcelaService } from "./service";
import { CrudRequest, CrudRequestInterceptor, ParsedRequest } from "@nestjsx/crud";
import { UserRequest } from "src/_auth/user.decorator";

@Controller('pedido-compra-contrato-parcela')
export class PedidoCompraContratoParcelaController extends BaseCrudController{
    constructor(public service: PedidoCompraContratoParcelaService,
                protected userService: UserService) {
        super(service, userService)
    }

    @Post('importar/parcelas')
    @UseInterceptors(CrudRequestInterceptor)
    async atendimentoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.importarParcelas(req, user, body)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }


    @Post('aprovar/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async aprovarFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        let result = await this.service.aprovar(req, user, body)
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
        let result = await this.service.cancelarAprovacao(req, user, body)
        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }
        return result
    }


    @Post('baixar/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async baixarFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        let result = await this.service.baixar(req, user, body)
        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }
        return result
    }


    @Post('cancelar-baixa/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async cancelarBaixaFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        let result = await this.service.cancelarBaixa(req, user, body)
        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }
        return result
    }

    @Get(':idParcela/item')
    @UseInterceptors(CrudRequestInterceptor)
    async listaItemParcela(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Param('idParcela') id: number){

        const user = await this.getDetailToken(req, authToken.token)
        let result = await this.service.listaItemParcela(req, user, {pedidoCompraContratoParcelaId:id})
        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }
        return result
    }

    @Delete(':idParcela/item/:idItem')
    @UseInterceptors(CrudRequestInterceptor)
    async removeItemParcela(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Param('idParcela') idParcela: number, @Param('idItem') idItem: number){

        const user = await this.getDetailToken(req, authToken.token)
        let result = await this.service.removeItemParcela(req, user, {pedidoCompraContratoParcelaId:idParcela, id: idItem})
        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }
        return result
    }

    @Post('item')
    @UseInterceptors(CrudRequestInterceptor)
    async salvaItemParcela(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)
        let result = await this.service.salvaItemParcela(req, user, body)
        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }
        return result
    }
}