import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { OrdemProducaoItemUser } from "./crud-user.entity";

@Injectable()
export class OrdemProducaoItemUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(OrdemProducaoItemUser) protected repo)
    {
        super(repo)
    }

}