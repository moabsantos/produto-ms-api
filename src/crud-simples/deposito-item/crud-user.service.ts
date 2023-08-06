import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { DepositoItemUser } from "./crud-user.entity";

@Injectable()
export class DepositoItemUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(DepositoItemUser) protected repo)
    {
        super(repo)
    }

}