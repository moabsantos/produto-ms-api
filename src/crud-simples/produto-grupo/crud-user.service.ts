import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { ProdutoGrupoUser } from "./crud-user.entity";

@Injectable()
export class ProdutoGrupoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(ProdutoGrupoUser) protected repo)
    {
        super(repo)
    }

}