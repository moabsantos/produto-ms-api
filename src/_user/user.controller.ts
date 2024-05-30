import { Body, Controller, Get, HttpException, HttpStatus, Post, UseInterceptors } from "@nestjs/common";
import { Crud, CrudRequest, CrudRequestInterceptor, ParsedRequest } from "@nestjsx/crud";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UserRequest } from "src/_auth/user.decorator";
import { BaseController } from "src/_shared/base.controller";

@Crud({
    model:{type: User},
    routes:{
        createOneBase: {
            returnShallow: false
        },
        only: ["getOneBase"],
    }})
@Controller('user')
export class UserController extends BaseController{

    constructor(public service: UserService){
        super(service)
    }
    
    @Get('perfil')
    @UseInterceptors(CrudRequestInterceptor)
    async PerfilList(@ParsedRequest() req: CrudRequest, @UserRequest() authToken){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.perfilsAcesso(req, user)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

    @Post('perfil')
    @UseInterceptors(CrudRequestInterceptor)
    async changePerfil(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.changePerfil(req, user, body.realmId)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

    @Post('mostrar-grupo-owner')
    @UseInterceptors(CrudRequestInterceptor)
    async showGroupOwner(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.showGroupOwner(req, user, body.showGroupOwner)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

    @Get('modulo-sistema')
    @UseInterceptors(CrudRequestInterceptor)
    async moduloSistema(@ParsedRequest() req: CrudRequest, @UserRequest() authToken){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.getModulosSistema(req, user)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }


    @Get('logoff')
    @UseInterceptors(CrudRequestInterceptor)
    async logoffSistema(@ParsedRequest() req: CrudRequest, @UserRequest() authToken){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.removeToken(req, user)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result
    }

}