import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { ProdutoCor } from "./crud.entity";
import { ProdutoCorUser } from "./crud-user.entity";

export class ProdutoCorService extends BaseCrudService{

    constructor (
        @InjectRepository(ProdutoCor) protected repo,
        @InjectRepository(ProdutoCorUser) protected repoUser)
    {
        super(repo, repoUser)
    }

}