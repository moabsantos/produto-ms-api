import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { CidadeUser } from "./crud-user.entity";

@Injectable()
export class CidadeUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(CidadeUser) protected repo)
    {
        super(repo)
    }

}