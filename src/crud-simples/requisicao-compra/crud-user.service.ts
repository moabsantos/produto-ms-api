import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { RequisicaoCompraUser } from "./crud-user.entity";

@Injectable()
export class RequisicaoCompraUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(RequisicaoCompraUser) protected repo)
    {
        super(repo)
    }

}