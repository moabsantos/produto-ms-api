import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { PaisUser } from "./crud-user.entity";

@Injectable()
export class PaisUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(PaisUser) protected repo)
    {
        super(repo)
    }

}