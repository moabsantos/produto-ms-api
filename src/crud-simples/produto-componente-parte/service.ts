import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { ProdutoComponenteParte } from "./crud.entity";
import { ProdutoComponenteParteUser } from "./crud-user.entity";
import { ProdutoComponenteService } from "../produto-componente/service";

export class ProdutoComponenteParteService extends BaseCrudService{

    constructor (
        @InjectRepository(ProdutoComponenteParte) protected repo,
        @InjectRepository(ProdutoComponenteParteUser) protected repoUser,
        private produtoComponenteServ: ProdutoComponenteService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "sup-produto-componente-parte-dig",
            update: "sup-produto-componente-parte-dig",
            delete: "sup-produto-componente-parte-dig",
            get: "sup-produto-componente-parte-dig"
        })

        this.modelsRequired = [
            {fieldName: 'produtoComponente', service: this.produtoComponenteServ, fields: ['id']}
        ]
    }

    getDataFromDto(dto: any, user: any, model: ProdutoComponenteParte){

        model = this.getDataModelsFromDto(model)
        model.sequencia = dto.sequencia
        model.quantidade = dto.quantidade
        model.consumo = dto.consumo
        model.nomeParte = dto.nomeParte
        model.description = dto.description

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!dto.sequencia) return false
        if (!dto.quantidade) return false
        if (!dto.consumo) return false
        if (!dto.nomeParte) return false

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid) return false

        dto.name = 
            'RELM_'+ user.realmId +
            '_PRODCOMP_'+ this['produtoComponente'].id +
            '_SEQ_'+ dto.sequencia +
            '_QTD_'+ dto.quantidade +
            '_CONS_'+ dto.consumo +
            '_PARTE_'+ dto.nomeParte

        dto.code = dto.name

        return super.validate(dto, user)
    }

}