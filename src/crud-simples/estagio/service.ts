import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";
import { Estagio } from "./crud.entity";

import { EstagioUser } from "./crud-user.entity";

export class EstagioService extends BaseCrudService{

    constructor (
        @InjectRepository(Estagio) protected repo,
        @InjectRepository(EstagioUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: Estagio){

        model.sigla = dto.sigla
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!user){
            this.logger.error("login is requerid")
            return
        }

        if (!dto.name){
            return false
        }

        return true

    }

}