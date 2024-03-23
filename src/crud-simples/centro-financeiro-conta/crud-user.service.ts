import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { CentroFinanceiroContaUser } from "./crud-user.entity";

@Injectable()
export class CentroFinanceiroContaUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(CentroFinanceiroContaUser) protected repo)
    {
        super(repo)
    }

}