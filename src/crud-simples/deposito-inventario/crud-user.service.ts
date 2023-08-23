import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { DepositoInventarioUser } from "./crud-user.entity";

@Injectable()
export class DepositoInventarioUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(DepositoInventarioUser) protected repo)
    {
        super(repo)
    }

}