import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { UserPassword } from './user-password.entity';
import * as bcrypt from 'bcrypt';
import { CrudRequest, ParsedRequest } from "@nestjsx/crud";

import { UserService } from "./user.service";
import { MailService } from "../_mail/mail.service";
import { env } from "process";
      
const saltRounds = 8

@Injectable()
export class UserPasswordService extends TypeOrmCrudService<UserPassword>{

    constructor (
        @InjectRepository(UserPassword) repo: any,
        private emailService: MailService,
        private userService: UserService)
    {
        super(repo)
    }

    requestChangePasswordByEmail(req, body):Promise<any>{
        return this.userService.findOne({where: {email: body.email}}).then(user => {

            if (!user){
                return
            }

            return this.repo.findOne({where:{userId:user.id}}).then( userPassword => {

                if (!userPassword){
                    userPassword = new UserPassword()
                    userPassword.userId = user.id
                }

                userPassword.codeVerification = Math.floor(
                    (Math.random() * 4000) + 1000
                ).toString()

                this.repo.save(userPassword)
            
                const urlChangePassword = `${process.env.PAGE_CHANGE_PASSWORD}?idUser=${user.id}&codeVerification=${userPassword.codeVerification}`

                this.emailService.sendEMail(body.email, 'Request Change Password', 
                {
                    nameUser: user.name, 
                    idUser: user.id, 
                    codeVerification: userPassword.codeVerification,
                    urlChangePassword: urlChangePassword
                }, 'request-change-password')

                return {email: body.email}
            })

        })
        return
    }

    async setUserPassword(@ParsedRequest() req: CrudRequest, dto: {idUser: number, password: string, codeVerification: string}): Promise<any>{
        
        const password = await bcrypt.hash(dto.password, saltRounds)

        return this.userService.findOne({where: {id: dto.idUser}}).then(user => {

            if (!user){
                return
            }

            return this.repo.find({where:{userId:dto.idUser}}).then( userPassword => {

                if (!userPassword[0]){
                    userPassword[0] = new UserPassword()
                    userPassword[0].userId = user.id
                }

                if (!userPassword[0].codeVerification){
                    return
                }

                if (userPassword[0].codeVerification != dto.codeVerification){
                    return
                }

                userPassword[0].password = password
                this.repo.save(userPassword[0])

                this.emailService.sendEMail(user.email, 'Confirm Change Password', 
                    {
                        nameUser: user.name, 
                        codeVerification: userPassword[0].codeVerification,
                        urlPageLogin: process.env.PAGE_LOGIN
                    }, 'confirm-change-password')

                return {id: dto.idUser}
            })

        })
    }

    async passwordIsValid(name: string, password: string): Promise<{userId: number; userName: string}>{

        const user = await this.userService.findOne({where:{name:name}})

        if (!user) {
            return undefined;
        }

        const userPassword = await this.repo.findOne({where:{userId:user.id}})

        if (!userPassword) {
            return undefined;
        }
        
        if (bcrypt.compareSync(password, userPassword.password)){
            return {userId: user.id, userName: user.name}
        }else{
            return undefined
        }

    }

}