import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoCompraContratoParcela } from "./crud.entity";
import { PedidoCompraContratoParcelaUser } from "./crud-user.entity";
import { PedidoCompraService } from "../pedido-compra/service";
import { TipoDocumentoService } from "../tipo-documento/service";
import { FornecedorService } from "../fornecedor/service";
import { FormaPagamentoService } from "../forma-pagamento/service";
import { PedidoCompraContratoService } from "../pedido-compra-contrato/service";
import { CrudRequest } from "@nestjsx/crud";

export class PedidoCompraContratoParcelaService extends BaseCrudService{

    listStatus = ['Pendente', 'Aprovado', 'Baixado']

    constructor (
        @InjectRepository(PedidoCompraContratoParcela) protected repo,
        @InjectRepository(PedidoCompraContratoParcelaUser) protected repoUser,

        private pedidoCompraServ: PedidoCompraService,
        private pedidoCompraContratoServ: PedidoCompraContratoService,
        private tipoDocumentoServ: TipoDocumentoService,
        private fornecedorServ: FornecedorService,
        private formaPagamentoServ: FormaPagamentoService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "sup-pedido-compra-contrato-dig",
            update: "sup-pedido-compra-contrato-dig",
            delete: "sup-pedido-compra-contrato-dig",
            get: "sup-pedido-compra-contrato-get"
        })

        this.modelsRequired = [
            {fieldName: 'pedidoCompra', service: this.pedidoCompraServ, fields: ['id'], optional: true},
            {fieldName: 'pedidoCompraContrato', service: this.pedidoCompraContratoServ, fields: ['id']},
            {fieldName: 'tipoDocumento', service: this.tipoDocumentoServ, fields:['id', 'name', 'sigla'], getId: () => this['pedidoCompraContrato'].tipoDocumentoId},
            {fieldName: 'fornecedor', service: this.fornecedorServ, fields: ['id', 'name'], getId: () => this['pedidoCompraContrato'].fornecedorId},
            {fieldName: 'formaPagamento', service: this.formaPagamentoServ, fields: ['id', 'name', 'sigla'], getId: () => this['pedidoCompraContrato'].formaPagamentoId}
        ]
    }

    getDataFromDto(dto: any, user: any, model: PedidoCompraContratoParcela){

        if (model.status && model.status == 'Aprovado') {

            model = this.getModelFromInputs(model, dto, ['valorDesconto', 'valorAcrescimo'])

        }

        if (!model.status || model.status == 'Pendente') {

            if (!model.status) model.status = 'Pendente'

            model = this.getModelFromInputs(model, dto, [
                'numeroParcela', 'dataVencimento', 'valorParcela', 'valorDesconto', 'valorAcrescimo'])

            model = this.getDataModelsFromDto(model)
        }

        if (model.status == 'Pendente' || model.status == 'Aprovado') {

            const valorFinalParcela = this.valorValido(Number(model.valorParcela),0)
            - this.valorValido(Number(model.valorDesconto),0)
            + this.valorValido(Number(model.valorAcrescimo),0)

            model.valorSaldo = valorFinalParcela - this.valorValido(Number(model.valorPago),0)
            if (model.valorSaldo < 0) model.valorCredito = model.valorSaldo * -1
            if (model.valorSaldo < 0) model.valorSaldo  = 0

        }

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const validateInputs = this.validateFieldsRequireds([
            {name: "valorParcela"},
            {name: "valorDesconto"},
            {name: "valorAcrescimo"}
        ], dto)
        if (!validateInputs.status) return validateInputs

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        dto.name = 
            'RELM_'+ user.realmId

        if (this['pedidoCompra'] && this['pedidoCompra'].id) dto.name = dto.name + '_PEDCOMP_'+ this['pedidoCompra'].id

        dto.name = dto.name + 
            '_Contrato_'+ this['pedidoCompraContrato'].id +
            '_Parcela_'+ dto.numeroParcela

        dto.code = dto.name

        return super.validate(dto, user)

    }

    async importarParcelas(req: CrudRequest, user: any, param: any): Promise<any>{

        const contrato = await this.pedidoCompraContratoServ.getUnico(req, user, {id: param.pedidoCompraContratoId})
        if (!contrato) return {status: false, error: true, message: `Contrato não localizado [${param.pedidoCompraContratoId}]`}
        if (!contrato['status'] || contrato['status'] != 'Pendente') return {status: false, error:false, message: "Contrato não está pendente"}
        if (!contrato['qtdParcelas'] || Number(contrato['qtdParcelas']) < 1) return {status: false, error:false, message: "Não há parcelas"}

        let valorTotal = 0
        const parcelas = await this.getLista(req, user, {pedidoCompraContratoId: param.pedidoCompraContratoId})
        parcelas.forEach(parcela => {
            valorTotal = valorTotal + Number(parcela.valorParcela)
        });

        if (this.numeroFormatado({valor: valorTotal}) == this.numeroFormatado({valor: Number(contrato.valorTotal)})) return {status: true, error: false, message: `Valor do contrato já está refletido nas parcelas [${valorTotal}]`}

        let valorSaldo = this.numeroFormatado({valor: Number(contrato.valorTotal) - valorTotal})
        let qtdParcelas = parcelas.length
        if (qtdParcelas == contrato['qtdParcelas'] && valorSaldo > 0) {

            await this.pedidoCompraContratoServ.updateRepoId(req, user, {
                id: param.pedidoCompraContratoId,
                qtdParcelas: qtdParcelas +1
            })

            await this.save(req, user, {
                pedidoCompraContratoId: param.pedidoCompraContratoId,
                dataVencimento: contrato.proximoVencimento,
                numeroParcela: qtdParcelas+1,
                valorParcela: valorSaldo
            })

            return {status: true, error: false, message: `O Contrato recebeu atualização nas parcelas [${valorTotal}]`}
        }

        if (qtdParcelas < contrato['qtdParcelas']) {

            let valorParcela = this.numeroFormatado({valor: valorSaldo / (contrato['qtdParcelas'] - qtdParcelas) })
            qtdParcelas = qtdParcelas +1
            
            for (let numParcela = qtdParcelas; numParcela <= contrato['qtdParcelas']; numParcela++) {

                await this.save(req, user, {
                    pedidoCompraContratoId: param.pedidoCompraContratoId,
                    dataVencimento: this.getProximoVencimento({
                        dataVencimento1: contrato.primeiroVencimento, 
                        intervalo: contrato.regraIntervaloParcelas ? contrato.regraIntervaloParcelas : "mensal", 
                        proximaParcela: numParcela}),
                    numeroParcela: numParcela,
                    valorParcela: valorParcela
                })
            }
        }

        return {status: true, error:false, message: "Importação finalizada com sucesso", saldoContrato: contrato.valorTotal, saldoParcelas: valorTotal}
    }


    async mudaStatusItem(req: any, user: any, dto: any) {
        const obj = await this.getById(req, user, {id: dto.id})

        if (obj.status != dto.statusOrigem) return this.getMessage(req, user, this, {status: false, error: true, message: `Parcela não está no status origem [${dto.statusOrigem}]`})

        await this.updateRepoId(req, user, {
            id: obj.id, 
            status: dto.statusDestino,
            idUserSelecao: dto.statusDestino == 'Baixado' ? 0 : obj.idUserSelecao
        })
    }

    async mudaStatusParcelas(req: any, user: any, dto: any){

        if (this.listStatus.indexOf(dto.statusDestino) < 0) return this.getMessage(req, user, this, {status: false, error: true, message: `Status Destino Inválido [${dto.statusDestino}]`})

        let itens = await this.getLista(req, user, {pedidoCompraContratoId: dto.pedidoCompraContratoId, idUserSelecao: user.id, status: dto.statusOrigem})

        for (let index = 0; index < itens.length; index++) {
            const element = itens[index];

            await this.mudaStatusItem(req, user, {id: element['id'], statusOrigem: dto.statusOrigem, statusDestino: dto.statusDestino})
        }

        return this.calculaContrato(req, user, dto)
    }

    async aprovar(req: any, user: any, dto: any): Promise<any> {
        return this.mudaStatusParcelas(req, user, {...dto, statusOrigem: 'Pendente', statusDestino: 'Aprovado'})
    }

    async cancelarAprovacao(req: any, user: any, dto: any): Promise<any> {
        return this.mudaStatusParcelas(req, user, {...dto, statusOrigem: 'Aprovado', statusDestino: 'Pendente'})
    }

    async baixar(req: any, user: any, dto: any): Promise<any> {
        return this.mudaStatusParcelas(req, user, {...dto, statusOrigem: 'Aprovado', statusDestino: 'Baixado'})
    }

    async cancelarBaixa(req: any, user: any, dto: any): Promise<any> {
        return this.mudaStatusParcelas(req, user, {...dto, statusOrigem: 'Baixado', statusDestino: 'Aprovado'})
    }

    async afterSave(req: any, dto: any, user: any, model: PedidoCompraContratoParcela) {

        const respContrato = await this.calculaContrato(req, user, {pedidoCompraContratoId: model.pedidoCompraContratoId})

        if (respContrato && respContrato.newContrato && respContrato.oldContrato 
                && respContrato.newContrato.valorTotalSaldo == 0
                && respContrato.oldContrato.gerarParcelaAutomaticamente == 1
        ) {

            const novoContrato = this.adicionarValorContrato(req, user, {
                id: respContrato.newContrato.id,
                valorMercadoria: Number(respContrato.newContrato.valorMercadoria),
                valorServico: Number(respContrato.newContrato.valorServico),
                valorAdicionar: Number(model.valorParcela),
            })

            await this.pedidoCompraContratoServ.updateRepoId(req, user, novoContrato)

            await this.calculaContrato(req, user, {pedidoCompraContratoId: model.pedidoCompraContratoId})
        }

        return await super.afterSave(req, dto, user, model)

    }

    adicionarValorContrato(req: any, user: any, dto: any): any {
        if (dto.valorServico == 0 ) dto.valorServico = dto.valorServico + dto.valorAdicionar
        if (dto.valorMercadoria == 0 && dto.valorServico > 0) dto.valorMercadoria = dto.valorMercadoria + dto.valorAdicionar
        
        return dto
    }

    async calculaContrato(req: any, user: any, dto: any): Promise<any> {
        
        let contrato = await this.pedidoCompraContratoServ.getById(req, user, {id: dto.pedidoCompraContratoId})
        if (!contrato) return {status: false, error: true, message: `Contrato não encontrado [${dto.pedidoCompraContratoId}]`}

        let tipoDocumento = await this.tipoDocumentoServ.getById(req, user, {id: contrato.tipoDocumentoId})
        if (!tipoDocumento) return {status: false, error: true, message: `Tipo de Documento do Contrato não encontrado [${contrato.tipoDocumentoId}]`}

        let itens = await this.getLista(req, user, {pedidoCompraContratoId: dto.pedidoCompraContratoId, idUserSelecao: user.id})

        let dataMinima = new Date()
        dataMinima = new Date(dataMinima.getFullYear(), dataMinima.getMonth(), 1)

        let valorTotalParcela =  0
        let valorPago =  0
        let valorSaldo =  0
        
        let dataProximaFatura =  null
        let valorProximaFatura =  0

        let statusFinal = {
            valor: '*',
            pos: this.listStatus.indexOf('Pendente')
        }

        itens = await this.getLista(req, user, {pedidoCompraContratoId: dto.pedidoCompraContratoId})
        for (let index = 0; index < itens.length; index++) {
            const element = itens[index];

            valorTotalParcela = valorTotalParcela + Number(element.valorParcela)

            if (element.status != 'Baixado') {
                if (!dataProximaFatura) dataProximaFatura = element.dataVencimento
                let dataRef = new Date(dataProximaFatura.getFullYear(), dataProximaFatura.getMonth(), 1)
                let dataRefElemento = new Date(element.dataVencimento.getFullYear(), element.dataVencimento.getMonth(), 1)

                if (dataRefElemento < dataRef && dataRefElemento > dataMinima) {
                    dataRef = dataRefElemento
                    valorProximaFatura = 0
                }

                if (dataRefElemento <= dataRef) {
                    if (dataRefElemento < dataRef && dataRef > dataMinima) valorProximaFatura = 0
                    valorProximaFatura = valorProximaFatura + Number(element.valorParcela)

                    dataRef = dataMinima
                    if (dataProximaFatura > element.dataVencimento) dataProximaFatura = element.dataVencimento
                }
            }

            if (element.status == 'Baixado') valorPago = valorPago + Number(element.valorParcela)
            if (element.status != 'Baixado') valorSaldo = valorSaldo + Number(element.valorParcela)

            if (statusFinal.valor == '*') statusFinal = {
                valor: element.status,
                pos: this.listStatus.indexOf(element.status)
            }

            if (statusFinal.pos > this.listStatus.indexOf(element.status)) statusFinal = {
                valor: element.status,
                pos: this.listStatus.indexOf(element.status)
            }
        };

        let qtdParcelas = itens.length

        if (dataProximaFatura) this.pedidoCompraContratoServ.updateRepoId(req, user, {
            id: dto.pedidoCompraContratoId,
            proximoVencimento: dataProximaFatura, 
            proximoValor: valorProximaFatura
        })

        
        let valorMercadoria = Number(contrato.valorMercadoria)
        let valorServico = Number(contrato.valorServico)

        if (valorTotalParcela > contrato.valorTotal) {
            let valorDif = valorTotalParcela - Number(contrato.valorTotal)

            if (valorMercadoria >= valorServico) valorMercadoria = valorMercadoria + valorDif
            if (valorMercadoria < valorServico) valorServico = valorServico + valorDif
        }


        contrato.valorMercadoria = valorMercadoria
        contrato.valorServico = valorServico
        let valorTotal = this.pedidoCompraContratoServ.getValorTotalContrato(contrato)


        let newContrato = {
            id: dto.pedidoCompraContratoId,
            valorTotalParcela: valorTotalParcela,
            valorTotalPago: valorPago, 
            valorTotalSaldo: valorSaldo, 
            status: statusFinal.valor
        }

        if (tipoDocumento.flagParcelaRecalculaContrato) {
            newContrato['qtdParcelas'] = qtdParcelas
            newContrato['valorTotal'] = valorTotal
            newContrato['valorMercadoria'] = valorMercadoria
            newContrato['valorServico'] = valorServico
        }

        this.pedidoCompraContratoServ.updateRepoId(req, user, newContrato)

        return {status: true, error: false, oldContrato: contrato, newContrato: newContrato}
    }


    async delete(req: any, user: any, id: number){

        const item = await this.get(req, user, id)

        if (!item?.data[0]) return {status: false, error: true, id:-1, message: "Exclusão cancelada"}

        if (item?.data[0]['status'] != 'Pendente' || item.data[0].id != id) return {status: false, error: false, id:id, message: "Parcela não está em status Pendente"}

        const deleted = await this.repo.delete(item.data[0].id)

        return {status: true, error: false, id:id, message: "Exclusão da Parcela realizada"}
    }
}