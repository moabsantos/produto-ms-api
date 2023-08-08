import { Body, Controller, HttpException, HttpStatus, Post, UseInterceptors } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RequisicaoAlmoxarifadoItemService } from "./service";
import { CrudRequest, CrudRequestInterceptor, ParsedRequest } from "@nestjsx/crud";
import { UserRequest } from "src/_auth/user.decorator";

@Controller('requisicao-almoxarifado-item')
export class RequisicaoAlmoxarifadoItemController extends BaseCrudController{
    constructor(public service: RequisicaoAlmoxarifadoItemService,
                protected userService: UserService) {
        super(service, userService)
    }

    @Post('aprovacao/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async aprovacaoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.aprovacaoFullList(req, user, body.requisicaoAlmoxarifadoId)

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

        let result = await this.service.cancelarAprovacaoFullList(req, user, body.requisicaoAlmoxarifadoId)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

    @Post('separacao/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async separacaoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.separacaoFullList(req, user, body.requisicaoAlmoxarifadoId)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }


    @Post('cancelar-separacao/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async cancelarSeparacaoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.cancelarSeparacaoFullList(req, user, body.requisicaoAlmoxarifadoId)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

    @Post('atendimento/full-list')
    @UseInterceptors(CrudRequestInterceptor)
    async atendimentoFullList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.atendimentoFullList(req, user, body.requisicaoAlmoxarifadoId)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

}