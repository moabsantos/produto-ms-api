import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { Deposito } from "./crud.entity";
import { DepositoUser } from "./crud-user.entity";

export class DepositoService extends BaseCrudService{

    constructor (
        @InjectRepository(Deposito) protected repo,
        @InjectRepository(DepositoUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: Deposito){

        model.flagPrincipal = dto.flagPrincipal
        
        return super.getDataFromDto(dto, user, model)
    }

}