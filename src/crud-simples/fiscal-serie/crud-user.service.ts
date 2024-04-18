import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { FiscalSerieUser } from "./crud-user.entity";

@Injectable()
export class FiscalSerieUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(FiscalSerieUser) protected repo)
    {
        super(repo)
    }

}