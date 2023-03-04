import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { ClienteEstabelecimentoUser } from "./crud-user.entity";

@Injectable()
export class ClienteEstabelecimentoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(ClienteEstabelecimentoUser) protected repo)
    {
        super(repo)
    }

}