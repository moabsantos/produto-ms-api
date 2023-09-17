import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { ProdutoComponenteParteUser } from "./crud-user.entity";

@Injectable()
export class ProdutoComponenteParteUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(ProdutoComponenteParteUser) protected repo)
    {
        super(repo)
    }

}