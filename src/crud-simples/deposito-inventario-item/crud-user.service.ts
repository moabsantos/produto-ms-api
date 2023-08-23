import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { DepositoInventarioItemUser } from "./crud-user.entity";

@Injectable()
export class DepositoInventarioItemUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(DepositoInventarioItemUser) protected repo)
    {
        super(repo)
    }

}