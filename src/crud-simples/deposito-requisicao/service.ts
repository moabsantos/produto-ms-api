import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { DepositoRequisicao } from "./crud.entity";
import { DepositoRequisicaoUser } from "./crud-user.entity";

export class DepositoRequisicaoService extends BaseCrudService{

    constructor (
        @InjectRepository(DepositoRequisicao) protected repo,
        @InjectRepository(DepositoRequisicaoUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: DepositoRequisicao){
        
        return super.getDataFromDto(dto, user, model)
    }

}