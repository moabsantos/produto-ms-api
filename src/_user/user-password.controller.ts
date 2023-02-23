import { Body, Controller, HttpException, HttpStatus, Post, UseInterceptors } from "@nestjs/common";
import { Crud, CrudRequest, CrudRequestInterceptor, Override, ParsedRequest } from "@nestjsx/crud";
import { UserPassword } from "./user-password.entity";
import { UserPasswordService } from "./user-password.service";

@Crud({
    model:{
        type: UserPassword
    },
    routes:{
        createOneBase: {
            returnShallow: false
        },
        only: ["createOneBase"],
    }
})
@Controller('password')
export class UserPasswordController {

    constructor(public service: UserPasswordService){}

    @Post('mail/request-change')
    @UseInterceptors(CrudRequestInterceptor)
    requestChangePasswordByEmail(@ParsedRequest() req: CrudRequest, @Body() body): Promise<{email: string}>{

      return this.service.requestChangePasswordByEmail(req, body)
      
    }
    
    @Override('createOneBase')
    async setUserPassword(
      @ParsedRequest() req: CrudRequest,
      @Body() body: {idUser: number; password: string; codeVerification: string}
    ) {
    
        let result = await this.service.setUserPassword(req, body);

        if (!result){
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Processo cancelado devido falha',
            }, HttpStatus.FORBIDDEN);
        }


        return {idUser: body.idUser}

    }

}