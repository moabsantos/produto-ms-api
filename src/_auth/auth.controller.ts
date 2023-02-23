import { Controller, Request, Post, UseGuards, UseInterceptors, HttpException, HttpStatus, Get, Body } from "@nestjs/common";
import { CrudRequestInterceptor } from "@nestjsx/crud";
import { JwtAuthGuard } from "./jwt-auth.guards";
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login-basic')
    @UseInterceptors(CrudRequestInterceptor)
    async loginBasic(@Request() req, @Body() dto){

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
    getProfile(@Request() req) {
        return req.user;
    }

}