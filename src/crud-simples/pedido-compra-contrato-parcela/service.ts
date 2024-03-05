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
            create: "sup-pedido-compra-contrato-parcela-dig",
            update: "sup-pedido-compra-contrato-parcela-dig",
            delete: "sup-pedido-compra-contrato-parcela-dig",
            get: "sup-pedido-compra-contrato-parcela-dig"
        })

        this.modelsRequired = [
            {fieldName: 'pedidoCompra', service: this.pedidoCompraServ, fields: ['id'], optional: true},
            {fieldName: 'pedidoCompraContrato', service: this.pedidoCompraContratoServ, fields: ['id']},
            {fieldName: 'tipoDocumento', service: this.tipoDocumentoServ, fields:['id', 'name', 'sigla']},
            {fieldName: 'fornecedor', service: this.fornecedorServ, fields: ['id', 'name']},
            {fieldName: 'formaPagamento', service: this.formaPagamentoServ, fields: ['id', 'name', 'sigla']}
        ]
    }

    getDataFromDto(dto: any, user: any, model: PedidoCompraContratoParcela){

        model = this.getModelFromInputs(model, dto, ['valorParcela', 'valorDesconto', 'valorAcrescimo'])
        model = this.getDataModelsFromDto(model)

        const valorFinalParcela = this.valorValido(Number(dto.valorParcela),0)
            - this.valorValido(Number(dto.valorDesconto),0)
            - this.valorValido(Number(dto.valorAcrescimo),0)

        model.valorSaldo = valorFinalParcela - this.valorValido(Number(dto.valorPago),0)
        if (model.valorSaldo < 0) model.valorCredito = model.valorSaldo * -1
        if (model.valorSaldo < 0) model.valorSaldo  = 0

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!this.validateFieldsRequireds([
            {name: "valorParcela"},
            {name: "valorDesconto"},
            {name: "valorAcrescimo"}
        ], dto)) return false

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid) return false

        dto.name = 
            'RELM_'+ user.realmId

        if (this['pedidoCompra']) dto.name = dto.name + 
            '_PEDCOMP_'+ this['pedidoCompra'].id

        dto.name = dto.name + 
            '_Contrato_'+ this['pedidoCompraContrato'].id +
            '_Parcela_'+ dto.parcela

        dto.code = dto.name

        return super.validate(dto, user)

    }

    async importarParcelas(req: CrudRequest, user: any, param: any): Promise<any>{

        const contrato = this.pedidoCompraContratoServ.getUnico(req, user, {id: param.pedidoCompraContratoId})
        if (!contrato) return
        if (!contrato['status'] || contrato['status'] != 'Pendente') return
        if (!contrato['qtdParcelas'] || Number(contrato['qtdParcelas']) < 1) return

        for (let numParcela = 1; numParcela < contrato['qtdParcelas']; numParcela++) {
            let parcelaContrato = this.getUnico(req, user, {
                pedidoCompraContratoId: param.pedidoCompraContratoId
            })
            
            parcelaContrato['pedidoCompraContratoId'] = contrato['id']

            parcelaContrato['numeroParcela'] = numParcela
            parcelaContrato['dataVencimento'] = contrato['primeiroVencimento']
            parcelaContrato['valorParcela'] = 100

            this.save(req, user, parcelaContrato)
        }

        return null
    }

}