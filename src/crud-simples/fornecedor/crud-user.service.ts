import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { FornecedorUser } from "./crud-user.entity";

@Injectable()
export class FornecedorUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(FornecedorUser) protected repo)
    {
        super(repo)
    }

}