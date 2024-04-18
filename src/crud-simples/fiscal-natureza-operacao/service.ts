import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { FiscalNaturezaOperacao } from "./crud.entity";
import { FiscalNaturezaOperacaoUser } from "./crud-user.entity";
import { FiscalSerieService } from "../fiscal-serie/service";

export class FiscalNaturezaOperacaoService extends BaseCrudService{

    constructor (
        @InjectRepository(FiscalNaturezaOperacao) protected repo,
        @InjectRepository(FiscalNaturezaOperacaoUser) protected repoUser,
        private serieServ: FiscalSerieService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "fiscal-natureza-operacao-dig",
            update: "fiscal-natureza-operacao-dig",
            delete: "fiscal-natureza-operacao-dig",
            //get: "fiscal-natureza-operacao-cons",
        })

        this.modelsRequired = [
            {fieldName: 'fiscalSerie', service: this.serieServ, fields: ['id', 'name', 'sigla']},
        ]
    }

    getDataFromDto(dto: any, user: any, model: FiscalNaturezaOperacao){

        model = this.getModelFromInputs(model, dto, [
            'sigla', 'geralCodTipo', 'geralCodFinalidade', 'geralCodIndicadorFinal'])

        model = this.getDataModelsFromDto(model)
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const checkFields = this.validateFieldsRequireds([
            {name: "sigla"}, {name: "geralCodTipo"}, {name: "geralCodFinalidade"}, {name: "geralCodIndicadorFinal"}], dto)
        if (!checkFields || !checkFields.status) return checkFields

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        return super.validate(dto, user)
    }

}