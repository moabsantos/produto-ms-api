import { Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";

import { RequisicaoAlmoxarifadoItemService } from "./service";
import { CrudRequest, ParsedRequest } from "@nestjsx/crud";
import { UserRequest } from "src/_auth/user.decorator";

@Controller('requisicao-almoxarifado-item')
export class RequisicaoAlmoxarifadoItemController extends BaseCrudController{
    constructor(public service: RequisicaoAlmoxarifadoItemService,
                protected userService: UserService) {
        super(service, userService)
    }

    @Post('atendimento')
    async atendimento(@ParsedRequest() req: CrudRequest, @UserRequest() authToken){

        const user = await this.getDetailToken(req, authToken.token)

        let result = await this.service.atendimento(req, user)

        if (!result){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Não houve resposta para os dados informados',
            }, HttpStatus.FORBIDDEN);
        }

        return result

    }
}