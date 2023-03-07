import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";
import { Setor } from "./crud.entity";

import { SetorUser } from "./crud-user.entity";

export class SetorService extends BaseCrudService{

    constructor (
        @InjectRepository(Setor) protected repo,
        @InjectRepository(SetorUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: Setor){

        model.sigla = dto.sigla
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!dto.name){
            return false
        }

        return super.validate(dto, user)

    }

}