import { Body, Controller, HttpException, HttpStatus } from "@nestjs/common";
import { Crud, CrudRequest, Override, ParsedRequest } from "@nestjsx/crud";
import { UserRequest } from "src/_auth/user.decorator";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { UserService } from "src/_user/user.service";
import { CustosMensaisFacadeService } from "./service";


@Crud({
    model:{
        type: BaseModelCrud
    },
    routes:{
        only: ["createOneBase"]
    }
})
@Controller('custos-mensais-facade')
export class CustosMensaisFacadeController extends BaseCrudController{
    constructor(public service: CustosMensaisFacadeService,
                protected userService: UserService) {
        super(service, userService)
    }

    @Override()
    async createOne(@ParsedRequest() req: CrudRequest, @UserRequest() authToken: any, @Body() body: any){

        const user = await this.getDetailToken(req, authToken.token)

        let result: any;

        try {

            result = await this.service.calculaCustoMes(req, user, body)

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