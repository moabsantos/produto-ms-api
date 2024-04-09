import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { FiscalNfeFacade } from "./crud.entity";
import { FiscalNfeFacadeUser } from "./crud-user.entity";

export class FiscalNfeFacadeService extends BaseCrudService{

    constructor (
        @InjectRepository(FiscalNfeFacade) protected repo,
        @InjectRepository(FiscalNfeFacadeUser) protected repoUser)
    {
        super(repo, repoUser)

        this.setRole({
            create: "custo-fiscal-nfe-gateway-dig",
            update: "custo-fiscal-nfe-gateway-dig",
            delete: "custo-fiscal-nfe-gateway-dig",
            //get: "custo-fiscal-nfe-gateway-cons",
        })

        this.modelsRequired = []
    }

    getDataFromDto(dto: any, user: any, model: FiscalNfeFacade){

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