import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { EstabelecimentoClienteUser } from "./crud-user.entity";

@Injectable()
export class EstabelecimentoClienteUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(EstabelecimentoClienteUser) protected repo)
    {
        super(repo)
    }

}