import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";
import { ProdutoComponenteUser } from "./crud-user.entity";

@Injectable()
export class ProdutoComponenteUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(ProdutoComponenteUser) protected repo
    ) 
    {
        super(repo)
    }

}