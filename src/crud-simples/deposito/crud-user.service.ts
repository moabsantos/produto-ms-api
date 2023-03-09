import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { DepositoUser } from "./crud-user.entity";

@Injectable()
export class DepositoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(DepositoUser) protected repo)
    {
        super(repo)
    }

}