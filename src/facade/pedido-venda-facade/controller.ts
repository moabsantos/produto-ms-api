import { Body, Controller, HttpException, HttpStatus, Param, Post, UseInterceptors } from "@nestjs/common";
import { Crud, CrudRequest, CrudRequestInterceptor, Override, ParsedRequest } from "@nestjsx/crud";

import { UserRequest } from "src/_auth/user.decorator";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { UserService } from "src/_user/user.service";

import { PedidoVendaFacadeService } from "./service";


@Crud({
    model:{
        type: BaseModelCrud
    },
    routes:{
        only: ["createOneBase"]
    }
})
@Controller('pedido-venda-facade')
export class PedidoVendaFacadeController extends BaseCrudController{
    constructor(public service: PedidoVendaFacadeService,
                protected userService: UserService) {
        super(service, userService)
    }

    @Post('geraRequisicaoAlmoxarifado/:id')
    @UseInterceptors(CrudRequestInterceptor)
    async geraRequisicaoAlmoxarifado(@ParsedRequest() req: CrudRequest, @Param('id') id: number, @UserRequest() authToken: any, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result: any;

        try {

            result = await this.service.geraRequisicaoKitItem(req, user, body)

        } catch (error) {

            console.log(error)

            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Processo cancelado devido falha',
            }, HttpStatus.FORBIDDEN);

        }
        
        return result

    }
}