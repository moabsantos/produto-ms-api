import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { RequisicaoGrupoUser } from "./crud-user.entity";

@Injectable()
export class RequisicaoGrupoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(RequisicaoGrupoUser) protected repo)
    {
        super(repo)
    }

}