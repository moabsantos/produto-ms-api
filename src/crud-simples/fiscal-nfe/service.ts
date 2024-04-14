import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { FiscalNfe } from "./crud.entity";
import { FiscalNfeUser } from "./crud-user.entity";

export class FiscalNfeService extends BaseCrudService{

    constructor (
        @InjectRepository(FiscalNfe) protected repo,
        @InjectRepository(FiscalNfeUser) protected repoUser)
    {
        super(repo, repoUser)

        this.setRole({
            create: "custo-fiscal-nfe-dig",
            update: "custo-fiscal-nfe-dig",
            delete: "custo-fiscal-nfe-dig",
            //get: "custo-fiscal-nfe-cons",
        })

        this.modelsRequired = []
    }

    getDataFromDto(dto: any, user: any, model: FiscalNfe){
    
        model = this.getModelFromInputs(model, dto, ['geralNaturezaOperacao', 'geralCodModelo', 'geralSerie', 'geralNumero', 'geralDataEmissao'])

        model = this.getDataModelsFromDto(model)
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const checkFields = this.validateFieldsRequireds([
            {name: "geralNaturezaOperacao"}, {name: "geralCodModelo"},
            {name: "geralSerie"}, {name: "geralNumero"}, {name: "geralDataEmissao"},
        ], dto)
        if (!checkFields || !checkFields.status) return checkFields

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        dto.code = `${user.realmId}_${dto.empresaId}_${dto.geralCodModelo}_${dto.geralSerie}_${dto.geralNumero}_${dto.geralDataEmissao}`
        dto.code = dto.name
        return super.validate(dto, user)
    }

}