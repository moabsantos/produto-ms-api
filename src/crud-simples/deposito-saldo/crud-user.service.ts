import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { DepositoSaldoUser } from "./crud-user.entity";

@Injectable()
export class DepositoSaldoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(DepositoSaldoUser) protected repo)
    {
        super(repo)
    }

}