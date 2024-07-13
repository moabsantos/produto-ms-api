import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoCompraContratoParcelaItemParcelaItem } from "./crud.entity";
import { PedidoCompraContratoParcelaItemUser } from "./crud-user.entity";


export class PedidoCompraContratoParcelaItemService extends BaseCrudService{

    constructor (
        @InjectRepository(PedidoCompraContratoParcelaItemParcelaItem) protected repo,
        @InjectRepository(PedidoCompraContratoParcelaItemUser) protected repoUser)
    {
        super(repo, repoUser)

        this.setRole({
            create: "sup-pedido-compra-contrato-dig",
            update: "sup-pedido-compra-contrato-dig",
            delete: "sup-pedido-compra-contrato-dig",
            get: "sup-pedido-compra-contrato-get"
        })

        this.modelsRequired = []
    }

    getDataFromDto(dto: any, user: any, model: PedidoCompraContratoParcelaItemParcelaItem){

        model = this.getDataModelsFromDto(model)

        if (!dto.sequencia) dto.sequencia = 1
        if (!dto.qtdParcelas || dto.qtdParcelas < 1) dto.qtdParcelas = 1

        model = this.getModelFromInputs(model, dto, [
            'pedidoCompraContratoParcelaId',
            'sequencia', 'code', 'name', 
            'qtdParcelas', 'numParcelaInicial', 'numParcelaFinal',
            'valorPrimeiraParcela', 'valorParcela', 'valorUltimaParcela', 'valorTotal'
        ])

        model.numParcelaInicial =  dto.numeroParcela
        model.numParcelaFinal =  dto.numeroParcela + model.qtdParcelas - 1

        if (model.qtdParcelas == 1) {
            model.valorPrimeiraParcela =  model.valorTotal
            model.valorParcela =  model.valorTotal
            model.valorUltimaParcela =  model.valorTotal
        }

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const checkInputs = this.validateFieldsRequireds([
            {name: "pedidoCompraContratoParcelaId"},
            {name: "code"},
            {name: "name"},
            {name: "numeroParcela"},
            {name: "qtdParcelas"},
            {name: "valorTotal"},
        ], dto)

        if (!checkInputs || !checkInputs.status) return checkInputs

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        return super.validate(dto, user)
    }

}