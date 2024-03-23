import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { CentroFinanceiroConta } from "./crud.entity";
import { CentroFinanceiroContaUser } from "./crud-user.entity";
import { CentroFinanceiroService } from "../centro-financeiro/service";

export class CentroFinanceiroContaService extends BaseCrudService{

    constructor (
        @InjectRepository(CentroFinanceiroConta) protected repo,
        @InjectRepository(CentroFinanceiroContaUser) protected repoUser,
        private centroFinanceiroServ: CentroFinanceiroService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "custo-centro-financeiro-conta-dig",
            update: "custo-centro-financeiro-conta-dig",
            delete: "custo-centro-financeiro-conta-dig",
            //get: "custo-centro-financeiro-conta-cons",
        })

        this.modelsRequired = [
            {fieldName: 'centroFinanceiro', service: this.centroFinanceiroServ, fields: ['name', 'sigla', 'id', 'code', 'description']}
        ]
    }

    getDataFromDto(dto: any, user: any, model: CentroFinanceiroConta){

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