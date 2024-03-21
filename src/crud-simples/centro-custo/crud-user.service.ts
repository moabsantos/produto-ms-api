import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { CentroCustoUser } from "./crud-user.entity";

@Injectable()
export class CentroCustoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(CentroCustoUser) protected repo)
    {
        super(repo)
    }

}