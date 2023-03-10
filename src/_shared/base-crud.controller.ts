import { Body, HttpException, HttpStatus, Param, UseGuards } from "@nestjs/common";
import { Crud, CrudRequest, Override, ParsedRequest } from "@nestjsx/crud";
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

        return result

    }

}