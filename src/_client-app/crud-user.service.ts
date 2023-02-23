import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";
import { ClientAppUser } from "./crud-user.entity";


export class ClientAppUserService extends BaseCrudUserService{

    constructor (@InjectRepository(ClientAppUser) repo)
    {
        super(repo)
    }

}