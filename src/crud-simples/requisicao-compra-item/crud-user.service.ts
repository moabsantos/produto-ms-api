import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { RequisicaoCompraItemUser } from "./crud-user.entity";

@Injectable()
export class RequisicaoCompraItemUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(RequisicaoCompraItemUser) protected repo)
    {
        super(repo)
    }

}