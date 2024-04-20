import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { FiscalNfe } from "./crud.entity";
import { FiscalNfeUser } from "./crud-user.entity";
import { EmpresaService } from "../empresa/service";
import { FiscalSerieService } from "../fiscal-serie/service";
import { FiscalNaturezaOperacaoService } from "../fiscal-natureza-operacao/service";
import { ClienteService } from "../cliente/service";
import { ClienteEstabelecimentoService } from "../cliente-estabelecimento/service";
import { CidadeService } from "../cidade/service";

export class FiscalNfeService extends BaseCrudService{

    constructor (
        @InjectRepository(FiscalNfe) protected repo,
        @InjectRepository(FiscalNfeUser) protected repoUser,
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

    getDataFromDto(dto: any, user: any, model: FiscalNfe){
    
        model = this.getModelFromInputs(model, dto, [
            'geralNaturezaOperacao', 'geralCodModelo', 'geralSerie', 'geralNumero', 'geralCodigo',
            'geralDataEmissao', 'geralDataSaidaEntrada',
            'geralCodTipoEmissao', 'geralCodTipoImpressao', 'geralCodIndicadorPresenca',
            'informacoesFisco1', 'informacoesFisco2', 'informacoesComplementares1', 'informacoesComplementares2'
        ])

        model.geralCodModelo = this['fiscalSerie'].codModelo
        model.geralSerie = this['fiscalSerie'].serie
        

        model.geralNaturezaOperacao = this['fiscalNaturezaOperacao'].name
        model.geralCodTipo = this['fiscalNaturezaOperacao'].geralCodTipo
        model.geralCodFinalidade = this['fiscalNaturezaOperacao'].geralCodFinalidade
        model.geralCodIndicadorFinal = this['fiscalNaturezaOperacao'].geralCodIndicadorFinal

        model.emitenteCpfCnpj = this['empresa'].cpfCnpj
        model.emitenteRazaoSocial = this['empresa'].razaoSocial
        model.emitenteNomeFantasia = this['empresa'].nomeFantasia
        model.emitenteIndInscricaoEstadual = this['empresa'].indInscricaoEstadual
        model.emitenteInscricaoEstadual = this['empresa'].inscricaoEstadual
        model.emitenteInscricaoMunicipal = this['empresa'].inscricaoMunicipal
        model.emitenteInscricaoSUFRAMA = this['empresa'].inscricaoSUFRAMA
        model.emitenteCnae = this['empresa'].cnae
        model.emitenteCrt = this['empresa'].crt
        model.emitenteLogo = this['empresa'].logo
        model.emitenteEmail = this['empresa'].email
        model.emitenteEnderecoFone = this['empresa'].enderecoFone
        model.emitenteEnderecoLogradouro = this['empresa'].enderecoLogradouro
        model.emitenteEnderecoNumero = this['empresa'].enderecoNumero
        model.emitenteEnderecoCep = this['empresa'].enderecoCep
        model.emitenteEnderecoComplemento = this['empresa'].enderecoComplemento
        model.emitenteEnderecoBairro = this['empresa'].enderecoBairro
        model.emitenteEnderecoCodMunicipio = this['cidadeEmitente'].codigoIBGE
        model.emitenteEnderecoNomeMunicipio = this['cidadeEmitente'].name
        model.emitenteEnderecoUF = this['cidadeEmitente'].ufSigla
        model.emitenteEnderecoCodPais = this['cidadeEmitente'].paisCodigoIBGE
        model.emitenteEnderecoNomePais = this['cidadeEmitente'].paisName

        model.destinatarioCpfCnpj = this['cliente'].flagPessoaJuridica != 1 ? this['cliente'].cpf : this['clienteEstabelecimento'].cnpj 
        //model.destinatarioRazaoSocial = this['clienteEstabelecimento'].razaoSocial
        model.destinatarioNome = this['cliente'].name
        model.destinatarioIndInscricaoEstadual = this['clienteEstabelecimento'].indInscricaoEstadual
        model.destinatarioInscricaoEstadual = this['clienteEstabelecimento'].inscricaoEstadual
        model.destinatarioInscricaoMunicipal = this['clienteEstabelecimento'].inscricaoMunicipal
        model.destinatarioInscricaoSUFRAMA = this['clienteEstabelecimento'].inscricaoSUFRAMA
        //model.destinatarioCnae = this['clienteEstabelecimento'].cnae
        //model.destinatarioCrt = this['clienteEstabelecimento'].crt
        //model.destinatarioLogo = this['clienteEstabelecimento'].logo
        model.destinatarioEmail = this['clienteEstabelecimento'].email
        model.destinatarioEnderecoFone = this['clienteEstabelecimento'].telefone
        model.destinatarioEnderecoLogradouro = this['clienteEstabelecimento'].endereco
        model.destinatarioEnderecoNumero = this['clienteEstabelecimento'].numero
        model.destinatarioEnderecoCep = this['clienteEstabelecimento'].cep
        model.destinatarioEnderecoComplemento = this['clienteEstabelecimento'].complemento
        model.destinatarioEnderecoBairro = this['clienteEstabelecimento'].bairro
        model.destinatarioEnderecoCodMunicipio = this['cidadeDestinatario'].codigoIBGE
        model.destinatarioEnderecoNomeMunicipio = this['cidadeDestinatario'].name
        model.destinatarioEnderecoUF = this['cidadeDestinatario'].ufSigla
        model.destinatarioEnderecoCodPais = this['cidadeDestinatario'].paisCodigoIBGE
        model.destinatarioEnderecoNomePais = this['cidadeDestinatario'].paisName


        model.geralUF = this['cidadeEmitente'].ufSigla
        model.geralCodigoUF = this['cidadeEmitente'].ufCodigoIBGE
        model.geralCodMunicipio = this['cidadeEmitente'].codigoIBGE
        
        model.geralCodDestino = '1'
        if (this['cidadeEmitente'].ufSigla != this['cidadeDestinatario'].ufSigla) model.geralCodDestino = '2'
        if (this['cidadeDestinatario'].ufSigla == 'EX') model.geralCodDestino = '3'
        
        model.geralCodProcessoEmissao = '0'

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

        dto.geralCodigo = Math.floor(Math.random() * 20)
        dto.geralNumero = await this.serieServ.getProximoNumero(null, {id: this['fiscalSerie'].id}, user)

        dto.code = `${user.realmId}_${dto.empresaId}_${dto.geralCodModelo}_${this['fiscalNaturezaOperacao'].fiscalSerieId}_${dto.geralNumero}_${dto.geralDataEmissao}`
        dto.name = dto.code
        return super.validate(dto, user)
    }

}