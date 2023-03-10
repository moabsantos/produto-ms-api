import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { PrioridadeUser } from "./crud-user.entity";

@Injectable()
export class PrioridadeUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(PrioridadeUser) protected repo)
    {
        super(repo)
    }

}