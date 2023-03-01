import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { FichaTecnica } from "./crud.entity";
import { FichaTecnicaUser } from "./crud-user.entity";

import { UnidadeMedidaService } from "../unidade-medida/service";

export class FichaTecnicaService extends BaseCrudService{

    private unidadeMedida: any;

    constructor (
        @InjectRepository(FichaTecnica) protected repo,
        @InjectRepository(FichaTecnicaUser) protected repoUser,
        private unidadeServ: UnidadeMedidaService )
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: FichaTecnica){

        model.unidadeMedidaName = this.unidadeMedida.name
        model.unidadeMedidaSigla = this.unidadeMedida.sigla
        model.unidadeMedidaId = dto.unidadeMedidaId
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        const unidMedida = await this.unidadeServ.findByWhere({
            id: dto.unidadeMedidaId,
            realmId: user.realmId
        })

        if (unidMedida.length == 0){
            this.logger.error(`A unidade de medida ${dto.unidadeMedidaId} não foi encontrada`)
            return false
        }
        this.unidadeMedida = unidMedida[0]

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