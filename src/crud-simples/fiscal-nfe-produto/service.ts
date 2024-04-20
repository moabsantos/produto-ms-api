import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { FiscalNfeProduto } from "./crud.entity";
import { FiscalNfeProdutoUser } from "./crud-user.entity";
import { EmpresaService } from "../empresa/service";
import { FiscalSerieService } from "../fiscal-serie/service";
import { FiscalNaturezaOperacaoService } from "../fiscal-natureza-operacao/service";
import { ClienteService } from "../cliente/service";
import { ClienteEstabelecimentoService } from "../cliente-estabelecimento/service";
import { CidadeService } from "../cidade/service";

export class FiscalNfeProdutoService extends BaseCrudService{

    constructor (
        @InjectRepository(FiscalNfeProduto) protected repo,
        @InjectRepository(FiscalNfeProdutoUser) protected repoUser,
        private empresaServ: EmpresaService,
        private natOperacaoServ: FiscalNaturezaOperacaoService,
        private clienteServ: ClienteService,
        private clienteEstabServ: ClienteEstabelecimentoService,
        private CidadeServ: CidadeService,
        private serieServ: FiscalSerieService,)
    {
        super(repo, repoUser)

        this.setRole({
            create: "custo-fiscal-nfe-dig",
            update: "custo-fiscal-nfe-dig",
            delete: "custo-fiscal-nfe-dig",
            //get: "custo-fiscal-nfe-cons",
        })

        this.modelsRequired = [
            {fieldName: 'empresa', service: this.empresaServ, fields: ['id', 'name', 'sigla']},
            {fieldName: 'fiscalNaturezaOperacao', service: this.natOperacaoServ, fields: ['id', 'name', 'sigla']},
            {fieldName: 'fiscalNaturezaOperacao', service: this.natOperacaoServ, fields: ['id', 'name', 'sigla']},
            {fieldName: 'cliente', service: this.clienteServ, fields: ['id', 'name']},
            {fieldName: 'clienteEstabelecimento', service: this.clienteEstabServ, fields: ['id', 'name']},

            {fieldName: 'fiscalSerie', service: this.serieServ, fields: ['id', 'name', 'sigla'], getId: () => this['fiscalNaturezaOperacao'].fiscalSerieId},
            {fieldName: 'cidadeEmitente', service: this.CidadeServ, fields: [], getId: () => this['empresa'].cidadeId},
            {fieldName: 'cidadeDestinatario', service: this.CidadeServ, fields: [], getId: () => this['clienteEstabelecimento'].cidadeId},
        ]
    }

    getDataFromDto(dto: any, user: any, model: FiscalNfeProduto){
    
        model = this.getModelFromInputs(model, dto, [
            'geralNaturezaOperacao', 'geralCodModelo', 'geralSerie', 'geralNumero', 'geralCodigo',
            'geralDataEmissao', 'geralDataSaidaEntrada',
            'geralCodTipoEmissao', 'geralCodTipoImpressao', 'geralCodIndicadorPresenca',
            'informacoesFisco1', 'informacoesFisco2', 'informacoesComplementares1', 'informacoesComplementares2'
        ])

        

        model = this.getDataModelsFromDto(model)
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const checkFields = this.validateFieldsRequireds([
            {name: "geralNaturezaOperacao"}, {name: "geralCodModelo"},
            {name: "geralSerie"}, {name: "geralNumero"}, {name: "geralDataEmissao"},
        ], dto)
        if (!checkFields || !checkFields.status) return checkFields

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        dto.geralCodigo = Math.floor(Math.random() * 9999999)
        dto.geralNumero = await this.serieServ.getProximoNumero(null, {id: this['fiscalSerie'].id}, user)

        dto.code = `${user.realmId}_${dto.empresaId}_${dto.geralCodModelo}_${this['fiscalNaturezaOperacao'].fiscalSerieId}_${dto.geralNumero}_${dto.geralDataEmissao}`
        dto.name = dto.code
        return super.validate(dto, user)
    }

}