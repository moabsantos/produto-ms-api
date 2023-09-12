import { Body, Controller, HttpException, HttpStatus, Post, UseInterceptors } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { DominioImagemService } from "./service";
import { CrudRequest, CrudRequestInterceptor, ParsedRequest } from "@nestjsx/crud";
import { UserRequest } from "src/_auth/user.decorator";

@Controller('dominio-imagem')
export class DominioImagemController extends BaseCrudController{
    constructor(public service: DominioImagemService,
                protected userService: UserService) {
        super(service, userService)
    }


    @Post('capa')
    @UseInterceptors(CrudRequestInterceptor)
    async reActive(@ParsedRequest() req: CrudRequest, @UserRequest() authToken, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.setFlagCapa(req, user, body)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não encontrado ou não autorizado',
            }, HttpStatus.FORBIDDEN);
        }

        return result

    }


}