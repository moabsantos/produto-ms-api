import { Controller, Request, Post, UseGuards, UseInterceptors, HttpException, HttpStatus, Get, Body } from "@nestjs/common";
import { Crud, CrudRequest, CrudRequestInterceptor, Override, ParsedRequest } from "@nestjsx/crud";
import { JwtAuthGuard } from "./jwt-auth.guards";
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

import { UserService } from "src/_user/user.service";
import { UserRequest } from "./user.decorator";
import { BaseController } from "src/_shared/base.controller";
import { User } from "src/_user/user.entity";

@Crud({
    model:{
        type: User
    },
    routes:{
        createOneBase: {
            returnShallow: false
        },
        only: ["getManyBase"],
    }
})
@Controller('auth')
export class AuthController extends BaseController {

    constructor(
        private authService: AuthService,
        protected userService: UserService
    ){
        super(userService)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login-basic')
    @UseInterceptors(CrudRequestInterceptor)
    async loginBasic(@Request() req: any, @Body() dto: any){

        if (!req.user){
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Name or Password of user is not correct',
            }, HttpStatus.FORBIDDEN);
        }

        return this.authService.login(req.user, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @UseInterceptors(CrudRequestInterceptor)
    async getProfile(@ParsedRequest() req: CrudRequest, @UserRequest() authToken: any) {
        return this.getDetailToken(req, authToken.token);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CrudRequestInterceptor)
    @Override()
    async getMany(@ParsedRequest() req: CrudRequest, @UserRequest() authToken: any) {
        return this.getProfile(req, authToken);
    }

}