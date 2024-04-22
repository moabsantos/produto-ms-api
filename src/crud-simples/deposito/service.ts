import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { Deposito } from "./crud.entity";
import { DepositoUser } from "./crud-user.entity";
import { EmpresaService } from "../empresa/service";
import { SetorService } from "../setor/service";

export class DepositoService extends BaseCrudService{

    constructor (
        @InjectRepository(Deposito) protected repo,
        @InjectRepository(DepositoUser) protected repoUser,
        private empresaServ: EmpresaService,
        private setorServ: SetorService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "estoque-deposito-dig",
            update: "estoque-deposito-dig",
            delete: "estoque-deposito-dig",
            //get: "estoque-deposito-get",
        })

        this.modelsRequired = [
            {fieldName: 'setor', service: this.setorServ, fields: ['name', 'sigla', 'id', 'code', 'description']},
            {fieldName: 'empresa', service: this.empresaServ, fields: ['name', 'sigla', 'id', 'code']}
        ]
    }

    getDataFromDto(dto: any, user: any, model: Deposito){

        model = this.getModelFromInputs(model, dto, [
            'sigla', 'flagPrincipal', 'flagBaixaEstoque', 'flagProducao', 
            'flagAjusteInventario', 'flagFornecedor', 'flagCliente',
            'flagFaturamento'])

        model = this.getDataModelsFromDto(model)
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const checkFields = this.validateFieldsRequireds([
            {name: "dataSolicitacao"}, {name: "flagPrincipal"}
            , {name: "flagBaixaEstoque"}, {name: "flagAjusteInventario"}
            , {name: "flagFornecedor"}, {name: "flagCliente"}
            , {name: "flagProducao"}]
        , dto)

        if (!checkFields.status) return checkFields

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        return super.validate(dto, user)
    }

}