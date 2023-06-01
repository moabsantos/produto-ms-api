import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";
import { ProdutoPrecoUser } from "./crud-user.entity";

@Injectable()
export class ProdutoPrecoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(ProdutoPrecoUser) protected repo
    ) 
    {
        super(repo)
    }

}