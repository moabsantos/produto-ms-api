import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService extends TypeOrmCrudService<User>{

    constructor (
        @InjectRepository(User) repo,
        private readonly mailerService: MailerService)
    {
        super(repo)
    }

    async findByWhere(where: any){
      
        return this.repo.find({where: where})
    }

}