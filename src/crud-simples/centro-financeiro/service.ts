import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { CentroFinanceiro } from "./crud.entity";
import { CentroFinanceiroUser } from "./crud-user.entity";

export class CentroFinanceiroService extends BaseCrudService{

    constructor (
        @InjectRepository(CentroFinanceiro) protected repo,
        @InjectRepository(CentroFinanceiroUser) protected repoUser)
    {
        super(repo, repoUser)

        this.setRole({
            create: "fin-centro-financeiro-dig",
            update: "fin-centro-financeiro-dig",
            delete: "fin-centro-financeiro-dig",
            //get: "custo-centro-financeiro-cons",
        })

        this.modelsRequired = []
    }

    getDataFromDto(dto: any, user: any, model: CentroFinanceiro){

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