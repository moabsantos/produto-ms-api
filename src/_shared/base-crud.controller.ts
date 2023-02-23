import { HttpService } from "@nestjs/axios";
import { Body, HttpException, HttpStatus, Param, UseGuards } from "@nestjs/common";
import { Crud, CrudRequest, Override, ParsedRequest } from "@nestjsx/crud";
import { firstValueFrom } from "rxjs";
import { JwtAuthGuard } from "src/_auth/jwt-auth.guards";

import { UserRequest } from "src/_auth/user.decorator";
import { UserService } from "src/_user/user.service";
import { BaseCrudUserService } from "./base-crud-user.service";
import { BaseCrudService } from './base-crud.service';
import { BaseModelCrud } from './base-model-crud.entity';

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
export class BaseCrudController {

    constructor(
        public service: BaseCrudService | BaseCrudUserService,
        protected userService: UserService,
        protected readonly http: HttpService
    ) {}

    async getDetailToken(req: any, token: any){

        let response: any;

        try {
            response = await firstValueFrom(this.http.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+ token));
        } catch (error) { 
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Token Inválido',
            }, HttpStatus.UNAUTHORIZED, {
                cause: error
            });
        }


        const userCheck = await this.userService.findByWhere({email: response.data.email})

        if (userCheck.length == 0){
            let newUser = await this.userService.createOne(req, {
                name: response.data.name,
                email: response.data.email,
                checked: true
            })

            return {userId: newUser.id, realmId: 1};
        }

        if (userCheck.length > 0){
            return {userId: userCheck[0].id, realmId: 1};
        }

        
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