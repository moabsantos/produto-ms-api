import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { Empresa } from "./crud.entity";
import { EmpresaUser } from "./crud-user.entity";
import { CidadeService } from "../cidade/service";

export class EmpresaService extends BaseCrudService{

    constructor (
        @InjectRepository(Empresa) protected repo,
        @InjectRepository(EmpresaUser) protected repoUser,
        private cidadeServ: CidadeService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "gestao-empresa-dig",
            update: "gestao-empresa-dig",
            delete: "gestao-empresa-dig",
            //get: "gestao-empresa-get"
        })

        this.modelsRequired = [
            {fieldName: 'cidade', service: this.cidadeServ, fields: ['name', 'sigla', 'id', 'code', 'ufSigla']},
        ]

    }

    getDataFromDto(dto: any, user: any, model: Empresa){

        model = this.getDataModelsFromDto(model)
        
        model = this.getModelFromInputs(model, dto, [
            'sigla', 
            'cpfCnpj', 'razaoSocial', 'nomeFantasia', 
            'indInscricaoEstadual', 'inscricaoEstadual', 'inscricaoMunicipal', 'inscricaoSUFRAMA',
            'cnae', 'crt', 'logo', 'email',
        
            'enderecoFone', 'enderecoLogradouro', 'enderecoNumero', 'enderecoCep', 'enderecoComplemento', 'enderecoBairro'])
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        if (!dto.name){
            return false
        }

        return super.validate(dto, user)

    }

}