import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { DespesaFinanceira } from "./crud.entity";
import { DespesaFinanceiraUser } from "./crud-user.entity";

export class DespesaFinanceiraService extends BaseCrudService{

    constructor (
        @InjectRepository(DespesaFinanceira) protected repo,
        @InjectRepository(DespesaFinanceiraUser) protected repoUser)
    {
        super(repo, repoUser)

        this.setRole({
            create: "custo-despesa-financeira-dig",
            update: "custo-despesa-financeira-dig",
            delete: "custo-despesa-financeira-dig",
            //get: "custo-despesa-financeira-cons",
        })

        this.modelsRequired = []
    }

    getDataFromDto(dto: any, user: any, model: DespesaFinanceira){

        model = this.getModelFromInputs(model, dto, ['sigla'])

        model = this.getDataModelsFromDto(model)
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const checkFields = this.validateFieldsRequireds([{name: "sigla"}], dto)
        if (!checkFields || !checkFields.status) return checkFields

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        return super.validate(dto, user)
    }

}