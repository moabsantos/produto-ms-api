import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { UF } from "./crud.entity";
import { UFUser } from "./crud-user.entity";
import { PaisService } from "../pais/service";

export class UFService extends BaseCrudService{

    pais: any;

    constructor (
        @InjectRepository(UF) protected repo,
        @InjectRepository(UFUser) protected repoUser,
        private paisServ: PaisService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: UF){

        model.sigla = dto.sigla

        model.paisId = this.pais.id
        model.paisName = this.pais.name
        model.paisSigla = this.pais.sigla
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        const paises = await this.paisServ.findByWhere({
            id: dto.paisId,
            realmId: user.realmId
        })

        if (paises.length == 0){
            this.logger.error(`O país ${dto.paisId} não foi encontrado`)
            return false
        }
        this.pais = paises[0] 
        
        return true
    }

}