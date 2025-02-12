import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { ProdutoMaterial } from "./crud.entity";
import { ProdutoMaterialUser } from "./crud-user.entity";

export class ProdutoMaterialService extends BaseCrudService{

    constructor (
        @InjectRepository(ProdutoMaterial) protected repo,
        @InjectRepository(ProdutoMaterialUser) protected repoUser)
    {
        super(repo, repoUser)
    }

}