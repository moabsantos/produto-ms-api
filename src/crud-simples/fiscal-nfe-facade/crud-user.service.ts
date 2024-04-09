import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { FiscalNfeFacadeUser } from "./crud-user.entity";

@Injectable()
export class FiscalNfeFacadeUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(FiscalNfeFacadeUser) protected repo)
    {
        super(repo)
    }

}