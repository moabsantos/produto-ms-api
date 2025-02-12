import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { ProdutoCorUser } from "./crud-user.entity";

@Injectable()
export class ProdutoCorUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(ProdutoCorUser) protected repo)
    {
        super(repo)
    }

}