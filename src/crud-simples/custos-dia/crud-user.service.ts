import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { CustosDiaUser } from "./crud-user.entity";

@Injectable()
export class CustosDiaUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(CustosDiaUser) protected repo)
    {
        super(repo)
    }

}