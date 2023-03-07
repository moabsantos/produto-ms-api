import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { Cidade } from "./crud.entity";
import { CidadeUser } from "./crud-user.entity";
import { PaisService } from "../pais/service";
import { UFService } from "../uf/service";

export class CidadeService extends BaseCrudService{

    pais: any;
    uf: any;

    constructor (
        @InjectRepository(Cidade) protected repo,
        @InjectRepository(CidadeUser) protected repoUser,
        private paisServ: PaisService,
        private ufServ: UFService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: Cidade){

        model.sigla = dto.sigla

        model.paisId = this.pais.id
        model.paisName = this.pais.name
        model.paisSigla = this.pais.sigla
        
        model.ufId = this.uf.id
        model.ufName = this.uf.name
        model.ufSigla = this.uf.sigla

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        const UFs = await this.ufServ.findByWhere({
            id: dto.ufId,
            realmId: user.realmId
        })

        if (UFs.length == 0){
            this.logger.error(`A UF ${dto.ufId} não foi encontrada`)
            return false
        }
        this.uf = UFs[0] 

        const paises = await this.paisServ.findByWhere({
            id: this.uf.paisId,
            realmId: user.realmId
        })

        if (paises.length == 0){
            this.logger.error(`O país ${dto.paisId} não foi encontrado`)
            return false
        }
        this.pais = paises[0] 
        
        return super.validate(dto, user)
    }

}