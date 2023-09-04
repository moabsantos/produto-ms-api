import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { DominioColecaoUser } from "./crud-user.entity";

@Injectable()
export class DominioColecaoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(DominioColecaoUser) protected repo)
    {
        super(repo)
    }

}