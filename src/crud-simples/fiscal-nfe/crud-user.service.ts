import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { FiscalNfeUser } from "./crud-user.entity";

@Injectable()
export class FiscalNfeUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(FiscalNfeUser) protected repo)
    {
        super(repo)
    }

}