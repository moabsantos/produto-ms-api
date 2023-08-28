import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { ClienteEstabelecimento } from "./crud.entity";
import { ClienteEstabelecimentoUser } from "./crud-user.entity";
import { ClienteService } from "../cliente/service";
import { CidadeService } from "../cidade/service";

export class ClienteEstabelecimentoService extends BaseCrudService{

    cliente: any;
    cidade: any;

    constructor (
        @InjectRepository(ClienteEstabelecimento) protected repo,
        @InjectRepository(ClienteEstabelecimentoUser) protected repoUser,
        private clienteServ: ClienteService,
        private cidadeServ: CidadeService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "com-cliente-estabelecimento-dig",
            update: "com-cliente-estabelecimento-dig",
            delete: "com-cliente-estabelecimento-dig",
            get: "com-cliente-estabelecimento-dig"
        })

        this.modelsRequired = [
            {fieldName: 'cidade', service: this.cidadeServ, fields: ['name', 'sigla', 'id', 'code']},
            {fieldName: 'cliente', service: this.clienteServ, fields: ['name', 'sigla', 'id', 'code']},
        ]
    }

    getDataFromDto(dto: any, user: any, model: ClienteEstabelecimento){
    
        model = this.getDataModelsFromDto(model)

        model = this.getModelFromInputs(model, dto, [
            'code',
            'cnpj', 'inscricaoEstadual',
            'email', 'telefone',
            'endereco', 'numero', 'bairro', 'cep'
        ])

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid) return false

        dto.name = 'REALM_'+ user.realmId +'_CLI_'+ this['cliente'].id +'_COD_'+ dto.code

        return super.validate(dto, user)

    }

}