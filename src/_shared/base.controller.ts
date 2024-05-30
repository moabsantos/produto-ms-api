import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { UserService } from "src/_user/user.service";

export class BaseController {

    protected readonly http: HttpService
    constructor(protected userService: UserService){
        this.http = new HttpService()
    }

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

        if (!response?.data?.email){
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Token Inválido',
            }, HttpStatus.UNAUTHORIZED, {
                cause: {name: "Token Invalid", message: "Email não encontrado"}
            });
        }

        const userCheck = await this.userService.findByWhere({email: response.data.email})

        if (userCheck.length == 1 && ( !userCheck[0].checked || userCheck[0].picture != response.data.picture)){
            userCheck[0].checked = true
            userCheck[0].name = response.data.name
            userCheck[0].picture = response.data.picture
            this.userService.updateOne(req, userCheck[0])
        }

        if (userCheck.length == 1) await this.userService.checkRealmUser(req, userCheck[0])

        if (userCheck.length == 0){

            let newUser = await this.userService.createOne(req, {
                name: response.data.name,
                email: response.data.email,
                checked: true
            })

            return {
                userId: newUser.id, 
                ...newUser
            };

        }

        if (userCheck.length == 1){
            return {
                userId: userCheck[0].id, 
                ...userCheck[0],

                hasPermissao: (permissaoCode: string) => {
                    return this.userService.hasPermissao(userCheck[0].id, permissaoCode, userCheck[0].realmId)
                }
            };
        }
    }

}