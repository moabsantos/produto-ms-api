import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { ProdutoBase } from "./crud.entity";
import { ProdutoBaseUser } from "./crud-user.entity";

export class ProdutoBaseService extends BaseCrudService{

    constructor (
        @InjectRepository(ProdutoBase) protected repo,
        @InjectRepository(ProdutoBaseUser) protected repoUser)
    {
        super(repo, repoUser)
    }

}