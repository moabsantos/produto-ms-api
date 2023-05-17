import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { ProducaoDiaUser } from "./crud-user.entity";

@Injectable()
export class ProducaoDiaUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(ProducaoDiaUser) protected repo)
    {
        super(repo)
    }

}