import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { DominioImagemUser } from "./crud-user.entity";

@Injectable()
export class DominioImagemUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(DominioImagemUser) protected repo)
    {
        super(repo)
    }

}