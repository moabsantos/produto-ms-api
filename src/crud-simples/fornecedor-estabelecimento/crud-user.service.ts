import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { FornecedorEstabelecimentoUser } from "./crud-user.entity";

@Injectable()
export class FornecedorEstabelecimentoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(FornecedorEstabelecimentoUser) protected repo)
    {
        super(repo)
    }

}