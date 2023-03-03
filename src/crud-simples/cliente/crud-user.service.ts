import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { ClienteUser } from "./crud-user.entity";

@Injectable()
export class ClienteUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(ClienteUser) protected repo)
    {
        super(repo)
    }

}