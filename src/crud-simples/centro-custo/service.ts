import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { CentroCusto } from "./crud.entity";
import { CentroCustoUser } from "./crud-user.entity";
import { EmpresaService } from "../empresa/service";
import { SetorService } from "../setor/service";

export class CentroCustoService extends BaseCrudService{

    constructor (
        @InjectRepository(CentroCusto) protected repo,
        @InjectRepository(CentroCustoUser) protected repoUser,
        private empresaServ: EmpresaService,
        private setorServ: SetorService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "custo-centro-custo-dig",
            update: "custo-centro-custo-dig",
            delete: "custo-centro-custo-dig",
            //get: "custo-centro-custo-cons",
        })

        this.modelsRequired = [
            {fieldName: 'setor', service: this.setorServ, fields: ['name', 'sigla', 'id', 'code', 'description']},
            {fieldName: 'empresa', service: this.empresaServ, fields: ['name', 'sigla', 'id', 'code']}
        ]
    }

    getDataFromDto(dto: any, user: any, model: CentroCusto){

        model = this.getModelFromInputs(model, dto, [
            'sigla', 'flagProducao', 'flagGestao', 'flagIndireto'])

        model = this.getDataModelsFromDto(model)
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const checkFields = this.validateFieldsRequireds(
            [{name: "flagGestao"}, {name: "flagIndireto"}, {name: "flagProducao"}]
            , dto)

        if (!checkFields.status) return checkFields

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        return super.validate(dto, user)
    }

}