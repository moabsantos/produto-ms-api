import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { SetorUser } from "./crud-user.entity";

@Injectable()
export class SetorUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(SetorUser) protected repo)
    {
        super(repo)
    }

}