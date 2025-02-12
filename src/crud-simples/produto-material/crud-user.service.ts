import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { ProdutoMaterialUser } from "./crud-user.entity";

@Injectable()
export class ProdutoMaterialUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(ProdutoMaterialUser) protected repo)
    {
        super(repo)
    }

}