import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { FormaPagamentoUser } from "./crud-user.entity";

@Injectable()
export class FormaPagamentoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(FormaPagamentoUser) protected repo)
    {
        super(repo)
    }

}