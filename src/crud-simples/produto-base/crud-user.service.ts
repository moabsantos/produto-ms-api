import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { ProdutoBaseUser } from "./crud-user.entity";

@Injectable()
export class ProdutoBaseUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(ProdutoBaseUser) protected repo)
    {
        super(repo)
    }

}