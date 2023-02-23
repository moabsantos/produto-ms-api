import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";
import { ProdutoUser } from "./crud-user.entity";

@Injectable()
export class ProdutoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(ProdutoUser) protected repo
    ) 
    {
        super(repo)
    }

}