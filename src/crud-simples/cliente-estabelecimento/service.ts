import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { ClienteEstabelecimento } from "./crud.entity";
import { ClienteEstabelecimentoUser } from "./crud-user.entity";
import { ClienteService } from "../cliente/service";
import { CidadeService } from "../cidade/service";
import { RepresentanteService } from "../representante/service";
import { READONLY } from "sqlite3";

export class ClienteEstabelecimentoService extends BaseCrudService{

    cliente: any;
    cidade: any;

    constructor (
        @InjectRepository(ClienteEstabelecimento) protected repo,
        @InjectRepository(ClienteEstabelecimentoUser) protected repoUser,
        private clienteServ: ClienteService,
        private representanteServ: RepresentanteService,
        private cidadeServ: CidadeService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "com-cliente-estabelecimento-dig",
            update: "com-cliente-estabelecimento-dig",
            delete: "com-cliente-estabelecimento-dig",
            get: "com-cliente-estabelecimento-cons"
        })

        this.modelsRequired = [
            {fieldName: 'cidade', service: this.cidadeServ, fields: ['name', 'sigla', 'id', 'code', 'ufSigla']},
            {fieldName: 'cliente', service: this.clienteServ, fields: ['name', 'sigla', 'id', 'code']},
            {fieldName: 'representante', service: this.representanteServ, fields: ['name', 'sigla', 'id', 'code']},
        ]
    }

    getDataFromDto(dto: any, user: any, model: ClienteEstabelecimento){
    
        model = this.getDataModelsFromDto(model)

        model = this.getModelFromInputs(model, dto, [
            'code',
            'cnpj', 'indInscricaoEstadual', 'inscricaoEstadual', 'inscricaoMunicipal', 'inscricaoSUFRAMA',
            'email', 'telefone',
            'endereco', 'numero', 'bairro', 'cep'
        ])

        return super.getDataFromDto(dto, user, model)
    }

    async foundDuplicated(dto: any, user: any): Promise<boolean> {

        if (!dto.name){
            return false
        }

        if (!dto.name) return false

        let modelRepo = await this.repo.findOne({where:{name:dto.name, clienteId: dto.clienteId, realmId: user.realmId}})
        
        if(modelRepo && (!dto.id || dto.id != modelRepo.id)){

            return true
        }

        return false
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        if (!dto.name) dto.name = 'REALM_'+ user.realmId +'_CLI_'+ this['cliente'].id +'_COD_'+ dto.code

        return super.validate(dto, user)

    }

    async setPrincipal(req: any, user: any, dto: any): Promise<any>{
        
        let estabelecimento = await this.getLista(req, user, {clienteId: dto.clienteId, flagPrincipal: 1})

        if (dto.clienteEstabelecimentoId && estabelecimento && estabelecimento[0]?.id == dto.clienteEstabelecimentoId) return this.getMessage(
            req, user, this, {status: true, error: false, message: `Este estabelecimento já é o principal [${dto.clienteEstabelecimentoId}]`})

        if (dto.clienteEstabelecimentoId && estabelecimento && estabelecimento.length > 0) {
            for (let index = 0; index < estabelecimento.length; index++) {
                const estab = estabelecimento[index];
                await this.updateRepoId(req, user, {id: estab.id, flagPrincipal: 0})
            }
        }

        if (dto.clienteEstabelecimentoId) {
            let estab = await this.getById(req, user, {id: dto.clienteEstabelecimentoId})
            if (estab) await this.updateRepoId(req, user, {id: estab.id, flagPrincipal: 1})
            if (estab) return this.getMessage(req, user, this, {id: dto.clienteEstabelecimentoId})
        }
    }

}