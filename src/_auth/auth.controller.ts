import { Controller, Request, Post, UseGuards, UseInterceptors, HttpException, HttpStatus, Get, Body } from "@nestjs/common";
import { CrudRequestInterceptor } from "@nestjsx/crud";
import { JwtAuthGuard } from "./jwt-auth.guards";
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { UserService } from "src/_user/user.service";

@Controller('auth')
export class AuthController {

    protected readonly http: HttpService

    constructor(
        private authService: AuthService,
        private userService: UserService
    ){
        this.http = new HttpService()
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
    getProfile(@Request() req: any) {
        return req.user;
    }

}