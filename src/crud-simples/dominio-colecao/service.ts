import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { DominioColecao } from "./crud.entity";
import { DominioColecaoUser } from "./crud-user.entity";

export class DominioColecaoService extends BaseCrudService{

    constructor (
        @InjectRepository(DominioColecao) protected repo,
        @InjectRepository(DominioColecaoUser) protected repoUser)
    {
        super(repo, repoUser)

        this.setRole({
            create: "sup-dominio-colecao-dig",
            update: "sup-dominio-colecao-dig",
            delete: "sup-dominio-colecao-dig",
            get: "sup-dominio-colecao-dig"
        })

        this.modelsRequired = []
    }

    getDataFromDto(dto: any, user: any, model: DominioColecao){

        if (!model.id) {
            model = this.getDataModelsFromDto(model)
            model.dominioName = dto.dominioName
            model.dominioId = dto.dominioId
        }

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid) return false

        dto.name = 
            'RELM_'+ user.realmId +
            '_DOM_NAME_'+ dto.dominioName +
            '_DOM_ID_'+ dto.dominioId

        dto.code = dto.name

        return super.validate(dto, user)
    }

}