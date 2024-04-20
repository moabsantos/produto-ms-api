import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { FiscalNfeProdutoUser } from "./crud-user.entity";

@Injectable()
export class FiscalNfeProdutoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(FiscalNfeProdutoUser) protected repo)
    {
        super(repo)
    }

}