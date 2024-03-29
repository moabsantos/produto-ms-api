import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";
import { GrupoAcesso } from "./crud.entity";

import { GrupoAcessoUser } from "./crud-user.entity";

export class GrupoAcessoService extends BaseCrudService{

    constructor (
        @InjectRepository(GrupoAcesso) protected repo,
        @InjectRepository(GrupoAcessoUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: GrupoAcesso){

        model.description = dto.description
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