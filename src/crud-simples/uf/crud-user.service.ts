import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { UFUser } from "./crud-user.entity";

@Injectable()
export class UFUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(UFUser) protected repo)
    {
        super(repo)
    }

}