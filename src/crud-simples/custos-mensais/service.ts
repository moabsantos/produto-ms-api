import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { CustosMensais } from "./crud.entity";
import { CustosMensaisUser } from "./crud-user.entity";

export class CustosMensaisService extends BaseCrudService{

    constructor (
        @InjectRepository(CustosMensais) protected repo,
        @InjectRepository(CustosMensaisUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: CustosMensais){

        model.empresaId = dto.empresaId
        model.ano = dto.ano
        model.mes = dto.mes

        model.setorId = dto.setorId
        model.setorName = dto.setorName
        model.setorSigla = dto.setorSigla

        model.itemDespesaId = dto.itemDespesaId
        model.itemDespesaName = dto.itemDespesaName

        model.unidadeMedidaId = dto.unidadeMedidaId
        model.unidadeMedidaName = dto.unidadeMedidaName
        model.unidadeMedidaSigla = dto.unidadeMedidaSigla

        model.valorRealizado = dto.valorRealizado
        model.valorPrevisto = dto.valorPrevisto
        
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