import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { DepositoSaldo } from "./crud.entity";
import { DepositoSaldoUser } from "./crud-user.entity";

export class DepositoSaldoService extends BaseCrudService{

    constructor (
        @InjectRepository(DepositoSaldo) protected repo,
        @InjectRepository(DepositoSaldoUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: DepositoSaldo){
        
        return super.getDataFromDto(dto, user, model)
    }

}