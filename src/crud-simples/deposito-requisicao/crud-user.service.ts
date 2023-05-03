import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { DepositoRequisicaoUser } from "./crud-user.entity";

@Injectable()
export class DepositoRequisicaoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(DepositoRequisicaoUser) protected repo)
    {
        super(repo)
    }

}