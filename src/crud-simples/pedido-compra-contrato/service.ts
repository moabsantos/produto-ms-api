import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoCompraContrato } from "./crud.entity";
import { PedidoCompraContratoUser } from "./crud-user.entity";

import { FornecedorService } from "../fornecedor/service";
import { PedidoCompraService } from "../pedido-compra/service";

export class PedidoCompraContratoService extends BaseCrudService{

    constructor (
        @InjectRepository(PedidoCompraContrato) protected repo,
        @InjectRepository(PedidoCompraContratoUser) protected repoUser,
        private pedidoCompraServ: PedidoCompraService,
        private fornecedorServ: FornecedorService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "sup-pedido-compra-contrato-dig",
            update: "sup-pedido-compra-contrato-dig",
            delete: "sup-pedido-compra-contrato-dig",
            get: "sup-pedido-compra-contrato-dig"
        })

        this.modelsRequired = [
            {fieldName: 'pedidoCompra', service: this.pedidoCompraServ, fields: ['id']},
            {fieldName: 'fornecedor', service: this.fornecedorServ, fields: ['id', 'name']}
        ]
    }

    getDataFromDto(dto: any, user: any, model: PedidoCompraContrato){

        model = this.getDataModelsFromDto(model)


        model.qtdParcelas = dto.qtdParcelas
        model.valorMercadoria = dto.valorMercadoria
        model.valorServico = dto.valorServico
        model.valorDesconto = dto.valorDesconto
        model.valorFrete = dto.valorFrete
        model.valorOutrosAcrescimos = dto.valorOutrosAcrescimos
        model.valorOutrasDeducoes = dto.valorOutrasDeducoes
        model.valorTotal = dto.valorMercadoria
            + dto.valorServico
            - dto.valorDesconto
            + dto.valorFrete
            + dto.valorOutrosAcrescimos
            - dto.valorOutrasDeducoes

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!this.validateFieldsRequireds([
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
            'RELM_'+ user.realmId +
            '_PEDCOMP_'+ this['pedidoCompra'].id +
            '_FORN_'+ this['fornecedor'].id

        dto.code = dto.name

        return super.validate(dto, user)
    }

}