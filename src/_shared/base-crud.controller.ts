import { Body, Get, HttpException, HttpStatus, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { Crud, CrudRequest, CrudRequestInterceptor, Override, ParsedRequest } from "@nestjsx/crud";
import { JwtAuthGuard } from "src/_auth/jwt-auth.guards";

import { UserRequest } from "src/_auth/user.decorator";
import { UserService } from "src/_user/user.service";
import { BaseCrudUserService } from "./base-crud-user.service";
import { BaseCrudService } from './base-crud.service';
import { BaseModelCrud } from './base-model-crud.entity';
import { BaseController } from "./base.controller";


@Crud({
    model:{
        type: BaseModelCrud
    },
    routes:{
        createOneBase: {
            returnShallow: false
        },
        only: ["createOneBase", "getOneBase", "getManyBase", "deleteOneBase"],
    }
})
@UseGuards(JwtAuthGuard)
export class BaseCrudController extends BaseController {

    constructor(
        public service: BaseCrudService | BaseCrudUserService | any,
        protected userService: UserService
    ) {
        super(userService)
    }


    @Override()
    async getOne(@ParsedRequest() req: CrudRequest, @Param('id') id: number, @UserRequest() authToken){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.get(req, user, id)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não encontrado ou não autorizado',
            }, HttpStatus.FORBIDDEN);
        }

        return result

    }

    @Override()
    async getMany(@ParsedRequest() req: CrudRequest, @UserRequest() authToken){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.get(req, user)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result

    }

    @Override()
    async createOne(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.save(req, user, body)

        if (!result){
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Processo cancelado devido falha',
            }, HttpStatus.FORBIDDEN);
        }

        return result

    }

    @Override()
    async deleteOne(@ParsedRequest() req: CrudRequest, @Param('id') id: number, @UserRequest() authToken){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.delete(req, user, id)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não encontrado ou não autorizado',
            }, HttpStatus.FORBIDDEN);
        }

        return { res: result }

    }


    @Post('reactive/:id')
    @UseInterceptors(CrudRequestInterceptor)
    async reActive(@ParsedRequest() req: CrudRequest, @Param('id') id: number, @UserRequest() authToken){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.reActive(req, user, id)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não encontrado ou não autorizado',
            }, HttpStatus.FORBIDDEN);
        }

        return result

    }


    @Post('selecao/item')
    @UseInterceptors(CrudRequestInterceptor)
    async selecaoItem(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        if (!body.id) throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: 'Informe o id para seleção',
        }, HttpStatus.FORBIDDEN);

        let result = await this.service.selecaoItem(req, user, body.id)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

    @Get('resumo/valores')
    @UseInterceptors(CrudRequestInterceptor)
    async resumoValores(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.resumoValores(req, user, body)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

}