import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { FiscalNaturezaOperacaoUser } from "./crud-user.entity";

@Injectable()
export class FiscalNaturezaOperacaoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(FiscalNaturezaOperacaoUser) protected repo)
    {
        super(repo)
    }

}