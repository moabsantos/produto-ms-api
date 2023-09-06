import { Body, Controller, HttpException, HttpStatus, Param, Post, UseInterceptors } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DepositoInventarioItemService } from "./service";
import { CrudRequest, CrudRequestInterceptor, ParsedRequest } from "@nestjsx/crud";
import { UserRequest } from "src/_auth/user.decorator";

@Controller('deposito-inventario-item')
export class DepositoInventarioItemController extends BaseCrudController{
    constructor(public service: DepositoInventarioItemService,
                protected userService: UserService) {
        super(service, userService)
    }

    @Post('importar/saldo')
    @UseInterceptors(CrudRequestInterceptor)
    async atendimentoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.importarSaldo(req, user, body)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

    @Post('iniciar/contagem')
    @UseInterceptors(CrudRequestInterceptor)
    async iniciarContagem(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.iniciarInventario(req, user, body)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

    @Post('informar/contagem')
    @UseInterceptors(CrudRequestInterceptor)
    async informarContagem(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.informarContagem(req, user, body)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }


    @Post('aplicar/contagem')
    @UseInterceptors(CrudRequestInterceptor)
    async aplicarContagem(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.aplicarContagem(req, user, body)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

    @Post('delete/inventario/:id')
    @UseInterceptors(CrudRequestInterceptor)
    async reActive(@ParsedRequest() req: CrudRequest, @Param('id') id: number, @UserRequest() authToken){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.deleteInventario(req, user, id)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não encontrado ou não autorizado',
            }, HttpStatus.FORBIDDEN);
        }

        return result

    }

}