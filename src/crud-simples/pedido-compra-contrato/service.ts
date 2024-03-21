import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoCompraContrato } from "./crud.entity";
import { PedidoCompraContratoUser } from "./crud-user.entity";

import { FornecedorService } from "../fornecedor/service";
import { PedidoCompraService } from "../pedido-compra/service";
import { FormaPagamentoService } from "../forma-pagamento/service";
import { TipoDocumentoService } from "../tipo-documento/service";
import { EmpresaService } from "../empresa/service";
import { CentroCustoService } from "../centro-custo/service";
import { DespesaFinanceiraService } from "../despesa-financeira/service";

export class PedidoCompraContratoService extends BaseCrudService{

    constructor (
        @InjectRepository(PedidoCompraContrato) protected repo,
        @InjectRepository(PedidoCompraContratoUser) protected repoUser,
        private empresaServ: EmpresaService,
        private centroCustoServ: CentroCustoService,
        private despesaFinanceiraServ: DespesaFinanceiraService,
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
            {fieldName: 'empresa', service: this.empresaServ, fields: ['id', 'name', 'sigla']},
            {fieldName: 'pedidoCompra', service: this.pedidoCompraServ, fields: ['id'], optional: true},
            {fieldName: 'tipoDocumento', service: this.tipoDocumentoServ, fields:['id', 'name', 'sigla']},
            {fieldName: 'fornecedor', service: this.fornecedorServ, fields: ['id', 'name']},
            {fieldName: 'formaPagamento', service: this.formaPagamentoServ, fields: ['id', 'name', 'sigla']},
            {fieldName: 'centroCusto', service: this.centroCustoServ, fields: ['id', 'name', 'sigla']},
            {fieldName: 'despesaFinanceira', service: this.despesaFinanceiraServ, fields: ['id', 'code', 'name', 'sigla']}
        ]
    }

    getDataFromDto(dto: any, user: any, model: PedidoCompraContrato){

        if (!model.status || model.status == 'Pendente'){
            model.status = 'Pendente'
            model = this.getDataModelsFromDto(model)

            model = this.getModelFromInputs(model, dto, [
                'numeroMatricula', 'numeroDocumento', 'dataDocumento', 
                'qtdParcelas', 'primeiroVencimento', 'proximaParcela', 'proximoVencimento', 'proximoValor',

                'valorMercadoria', 'valorServico', 'valorDesconto', 'valorDesconto',
                'valorFrete', 'valorOutrosAcrescimos', 'valorOutrasDeducoes',
            
                'site'])

            model.valorTotal = this.valorValido(Number(dto.valorMercadoria),0)
                + this.valorValido(Number(dto.valorServico),0)
                - this.valorValido(Number(dto.valorDesconto),0)
                + this.valorValido(Number(dto.valorFrete),0)
                + this.valorValido(Number(dto.valorOutrosAcrescimos),0)
                - this.valorValido(Number(dto.valorOutrasDeducoes),0)
        }

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const checkInputs = this.validateFieldsRequireds([
            {name: "proximaParcela"},{name: "proximoVencimento"},{name:"proximoValor"},
            {name: "numeroDocumento"},
            {name: "dataDocumento"},
            {name: "qtdParcelas"},
            {name: "valorMercadoria"},
            {name: "valorServico"},
            {name: "valorDesconto"},
            {name: "valorFrete"},
            {name: "valorOutrosAcrescimos"},
            {name: "valorOutrasDeducoes"}
        ], dto)
        if (!checkInputs || !checkInputs.status) return checkInputs

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        dto.name = 
            'RELM_'+ user.realmId

        if (this['pedidoCompra'] && this['pedidoCompra'].id) dto.name = dto.name + '_PEDCOMP_'+ this['pedidoCompra'].id

        dto.name = dto.name + 
            '_Forn_'+ this['fornecedor'].id + 
            '_TipoDoc_'+ this['tipoDocumento'].id +
            '_NoDocumento_'+ dto.numeroDocumento +
            '_FormPagto_'+ this['formaPagamento'].id

        dto.code = dto.name

        return super.validate(dto, user)
    }

    getFieldsResumo(){
        return [{
            groupName: "centroCusto",
            fieldName: "centroCustoName",
            fieldValue: "proximoValor"
        }]
    }

}