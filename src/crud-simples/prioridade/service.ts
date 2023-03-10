import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { Prioridade } from "./crud.entity";
import { PrioridadeUser } from "./crud-user.entity";

export class PrioridadeService extends BaseCrudService{

    constructor (
        @InjectRepository(Prioridade) protected repo,
        @InjectRepository(PrioridadeUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: Prioridade){

        model.sequencia = dto.sequencia
        
        return super.getDataFromDto(dto, user, model)
    }

}