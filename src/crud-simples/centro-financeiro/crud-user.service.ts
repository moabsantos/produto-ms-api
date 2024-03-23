import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { CentroFinanceiroUser } from "./crud-user.entity";

@Injectable()
export class CentroFinanceiroUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(CentroFinanceiroUser) protected repo)
    {
        super(repo)
    }

}