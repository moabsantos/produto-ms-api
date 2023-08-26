import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { RepresentanteUser } from "./crud-user.entity";

@Injectable()
export class RepresentanteUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(RepresentanteUser) protected repo)
    {
        super(repo)
    }

}