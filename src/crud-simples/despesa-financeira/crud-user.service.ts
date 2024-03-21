import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { DespesaFinanceiraUser } from "./crud-user.entity";

@Injectable()
export class DespesaFinanceiraUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(DespesaFinanceiraUser) protected repo)
    {
        super(repo)
    }

}