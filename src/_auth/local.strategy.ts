import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserPasswordService } from "src/_user/user-password.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userPasswordService: UserPasswordService) {
        super();
      }

    async validate(username: string, password: string): Promise<any> {

        const user = await this.userPasswordService.passwordIsValid(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}