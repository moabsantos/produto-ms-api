import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { ClientAppService } from "src/_client-app/crud.service";
import { RealmService } from "src/_realm/crud.service";



@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private readonly realmService: RealmService,
        private readonly clientAppService: ClientAppService
    ){}

    async login(user: any, dto: any){

        if (dto.realmId){
            let realm = await this.realmService.get(null, user, dto.realmId)

            if (!realm || !realm[0]){
                return
            }
        }

        if (dto.clientAppId){
            let clientApp = await this.clientAppService.get(null, user, dto.realmId)
            if (!clientApp || !clientApp[0]){
                return
            }
        }

        const payload = { 
            userName: user.userName, 
            userId: user.userId,
            realmId: dto.realmId,
            clientId: dto.clientId
        };

        return {
                accessToken: this.jwtService.sign(payload),
                userId: user.userId,
                expiresIn: 300,
                refreshExpiresIn: 1800,
                refreshToken: "",
                tokenType: "bearer",
                notBeforePolicy: 0,
                sessionState: "304d0b12-2aa0-4187-a263-859d512a6e4b",
                scope: "email profile"
        }
    }
}