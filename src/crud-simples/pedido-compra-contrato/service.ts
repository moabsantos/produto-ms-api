import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoCompraContrato } from "./crud.entity";
import { PedidoCompraContratoUser } from "./crud-user.entity";

import { FornecedorService } from "../fornecedor/service";
import { PedidoCompraService } from "../pedido-compra/service";
import { FormaPagamentoService } from "../forma-pagamento/service";
import { TipoDocumentoService } from "../tipo-documento/service";

export class PedidoCompraContratoService extends BaseCrudService{

    constructor (
        @InjectRepository(PedidoCompraContrato) protected repo,
        @InjectRepository(PedidoCompraContratoUser) protected repoUser,
        private pedidoCompraServ: PedidoCompraService,
        private tipoDocumentoServ: TipoDocumentoService,
        private fornecedorServ: FornecedorService,
        private formaPagamentoServ: FormaPagamentoService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "sup-pedido-compra-contrato-dig",
            update: "sup-pedido-compra-contrato-dig",
            delete: "sup-pedido-compra-contrato-dig",
            get: "sup-pedido-compra-contrato-dig"
        })

        this.modelsRequired = [
            {fieldName: 'pedidoCompra', service: this.pedidoCompraServ, fields: ['id'], optional: true},
            {fieldName: 'tipoDocumento', service: this.tipoDocumentoServ, fields:['id', 'name', 'sigla']},
            {fieldName: 'fornecedor', service: this.fornecedorServ, fields: ['id', 'name']},
            {fieldName: 'formaPagamento', service: this.formaPagamentoServ, fields: ['id', 'name', 'sigla']}
        ]
    }

    getDataFromDto(dto: any, user: any, model: PedidoCompraContrato){

        model = this.getDataModelsFromDto(model)

        model.numeroDocumento = dto.numeroDocumento
        model.dataDocumento = dto.dataDocumento

        model.qtdParcelas = dto.qtdParcelas
        model.valorMercadoria = dto.valorMercadoria
        model.valorServico = dto.valorServico
        model.valorDesconto = dto.valorDesconto
        model.valorFrete = dto.valorFrete
        model.valorOutrosAcrescimos = dto.valorOutrosAcrescimos
        model.valorOutrasDeducoes = dto.valorOutrasDeducoes
        model.valorTotal = this.valorValido(Number(dto.valorMercadoria),0)
            + this.valorValido(Number(dto.valorServico),0)
            - this.valorValido(Number(dto.valorDesconto),0)
            + this.valorValido(Number(dto.valorFrete),0)
            + this.valorValido(Number(dto.valorOutrosAcrescimos),0)
            - this.valorValido(Number(dto.valorOutrasDeducoes),0)
        console.log(model.valorTotal)
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!this.validateFieldsRequireds([
            {name: "numeroDocumento"},
            {name: "dataDocumento"},
            {name: "qtdParcelas"},
            {name: "valorMercadoria"},
            {name: "valorServico"},
            {name: "valorDesconto"},
            {name: "valorFrete"},
            {name: "valorOutrosAcrescimos"},
            {name: "valorOutrasDeducoes"}
        ], dto)) return false

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid) return false

        dto.name = 
            'RELM_'+ user.realmId

        if (this['pedidoCompra']) dto.name = dto.name + 
            '_PEDCOMP_'+ this['pedidoCompra'].id

        dto.name = dto.name + 
            '_Forn_'+ this['fornecedor'].id + 
            '_TipoDoc_'+ this['tipoDocumento'].id +
            '_NoDocumento_'+ dto.numeroDocumento +
            '_FormPagto_'+ this['formaPagamento'].id

        dto.code = dto.name

        return super.validate(dto, user)
    }

}