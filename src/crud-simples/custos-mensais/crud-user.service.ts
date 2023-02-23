import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { CustosMensaisUser } from "./crud-user.entity";

@Injectable()
export class CustosMensaisUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(CustosMensaisUser) protected repo)
    {
        super(repo)
    }

}