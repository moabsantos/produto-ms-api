import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { FornecedorEstabelecimento } from "./crud.entity";
import { FornecedorEstabelecimentoUser } from "./crud-user.entity";
import { FornecedorService } from "../fornecedor/service";
import { CidadeService } from "../cidade/service";
import { RepresentanteService } from "../representante/service";

export class FornecedorEstabelecimentoService extends BaseCrudService{

    fornecedor: any;
    cidade: any;

    constructor (
        @InjectRepository(FornecedorEstabelecimento) protected repo,
        @InjectRepository(FornecedorEstabelecimentoUser) protected repoUser,
        private fornecedorServ: FornecedorService,
        private representanteServ: RepresentanteService,
        private cidadeServ: CidadeService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "supr-fornecedor-dig",
            update: "supr-fornecedor-dig",
            delete: "supr-fornecedor-dig",
            // get: "supr-fornecedor-get"
        })

        this.modelsRequired = [
            {fieldName: 'cidade', service: this.cidadeServ, fields: ['name', 'sigla', 'id', 'code', 'ufSigla']},
            {fieldName: 'fornecedor', service: this.fornecedorServ, fields: ['name', 'sigla', 'id', 'code']},
            {fieldName: 'representante', service: this.representanteServ, fields: ['name', 'sigla', 'id', 'code']},
        ]
    }

    getDataFromDto(dto: any, user: any, model: FornecedorEstabelecimento){
    
        model = this.getDataModelsFromDto(model)

        model = this.getModelFromInputs(model, dto, [
            'code',
            'cnpj', 'indInscricaoEstadual', 'inscricaoEstadual', 'inscricaoMunicipal', 'inscricaoSUFRAMA',
            'email', 'telefone',
            'endereco', 'numero', 'bairro', 'cep', 'complemento'
        ])

        return super.getDataFromDto(dto, user, model)
    }

    async foundDuplicated(dto: any, user: any): Promise<boolean> {

        if (!dto.name) return false

        let modelRepo = await this.repo.findOne({where:{name:dto.name, fornecedorId: dto.fornecedorId, realmId: user.realmId}})
        
        if(modelRepo && (!dto.id || dto.id != modelRepo.id)){

            return true
        }

        return false
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        if (!dto.name) dto.name = 'REALM_'+ user.realmId +'_CLI_'+ this['fornecedor'].id +'_COD_'+ dto.code

        return super.validate(dto, user)

    }

    async setPrincipal(req: any, user: any, dto: any): Promise<any>{
        
        let estabelecimento = await this.getLista(req, user, {fornecedorId: dto.fornecedorId, flagPrincipal: 1})

        if (dto.fornecedorEstabelecimentoId && estabelecimento && estabelecimento[0]?.id == dto.fornecedorEstabelecimentoId) return this.getMessage(
            req, user, this, {status: true, error: false, message: `Este estabelecimento já é o principal [${dto.fornecedorEstabelecimentoId}]`})

        if (dto.fornecedorEstabelecimentoId && estabelecimento && estabelecimento.length > 0) {
            for (let index = 0; index < estabelecimento.length; index++) {
                const estab = estabelecimento[index];
                await this.updateRepoId(req, user, {id: estab.id, flagPrincipal: 0})
            }
        }

        if (dto.fornecedorEstabelecimentoId) {
            let estab = await this.getById(req, user, {id: dto.fornecedorEstabelecimentoId})
            if (estab) await this.updateRepoId(req, user, {id: estab.id, flagPrincipal: 1})
            if (estab) return this.getMessage(req, user, this, {id: dto.fornecedorEstabelecimentoId})
        }
    }

}