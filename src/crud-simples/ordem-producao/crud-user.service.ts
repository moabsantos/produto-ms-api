import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { OrdemProducaoUser } from "./crud-user.entity";

@Injectable()
export class OrdemProducaoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(OrdemProducaoUser) protected repo)
    {
        super(repo)
    }

}