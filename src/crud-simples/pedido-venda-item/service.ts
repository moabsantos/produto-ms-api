import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoVendaItem } from "./crud.entity";
import { PedidoVendaItemUser } from "./crud-user.entity";
import { PedidoVendaService } from "../pedido-venda/service";
import { ProdutoService } from "../produto/service";

export class PedidoVendaItemService extends BaseCrudService{

    pedidoVenda: any
    itemVenda: any

    constructor (
        @InjectRepository(PedidoVendaItem) protected repo,
        @InjectRepository(PedidoVendaItemUser) protected repoUser,
        private pedidoVendaServ: PedidoVendaService,
        private itemVendaServ: ProdutoService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "com-pedido-venda-dig",
            update: "com-pedido-venda-dig",
            delete: "com-pedido-venda-dig",
            get: "com-pedido-venda-dig"
        })

        this.modelsRequired = [
            {fieldKey: 'clienteId', fieldName: '', service: this.pedidoVendaServ, fields: [
                'clienteId', 'clienteName', 'clienteSigla',
                'cnpj', 'inscricaoEstadual',
                'email', 'telefone',
                'endereco', 'numero', 'bairro',
                'cidadeId', 'cidadeName', 'cidadeSigla']},

            {fieldKey: 'itemVendaId', fieldName: 'itemVenda', service: this.itemVendaServ, fields: [
                'id', 'name', 'sigla', 'description']},
        ]
    }

    getDataFromDto(dto: any, user: any, model: PedidoVendaItem){

        model = this.getDataModelsFromDto(model)

        model = this.getModelFromInputs(model, dto, [
            'quantidadeSolicitada', 'valorInicialItem', 'percentDescontoItem'])

        model.valorItem = dto.valorInicialItem * (1 - (dto.percentDescontoItem/100));
        model.valorTotalItem = model.valorItem * model.quantidadeSolicitada;

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        const pedidosVenda = await this.pedidoVendaServ.findByWhere({
            id: dto.pedidoVendaId,
            realmId: user.realmId
        })

        if (pedidosVenda.length == 0){
            this.logger.error(`O Pedido de Venda ${dto.pedidoVendaId} não foi encontrado`)
            return false
        }
        this.pedidoVenda = pedidosVenda[0]

        const itensVenda = await this.itemVendaServ.findByWhere({
            id: dto.itemVendaId,
            realmId: user.realmId
        })

        if (itensVenda.length == 0){
            this.logger.error(`O item de venda ${dto.itemVendaId} não foi encontrado`)
            return false
        }
        this.itemVenda = itensVenda[0]

        dto.name = this.pedidoVenda.id +'-'+ this.pedidoVenda.clienteId +'-'+ this.itemVenda.id
        return super.validate(dto, user)

    }

    async afterSave(req: any, dto: any, user: any, model: PedidoVendaItem) {

        const itensVenda = await this.repo.find({where:{
            pedidoVendaId: dto.pedidoVendaId,
            realmId: user.realmId
        }})

        let qtdTotal = 0
        let valorDesconto = 0
        let valorTotal = 0

        itensVenda.forEach(element => {
            qtdTotal = qtdTotal + element['quantidadeSolicitada']
            valorDesconto = valorDesconto + (qtdTotal * (element['valorInicialItem'] - element['valorItem'])) 
            valorTotal = valorTotal + element['valorTotalItem']
        });

        const pedidoVenda = await this.pedidoVendaServ.findByWhere({
            id: dto.pedidoVendaId,
            realmId: user.realmId
        })

        pedidoVenda[0]['quantidadeItens'] = qtdTotal
        pedidoVenda[0]['valorDesconto'] = valorDesconto
        pedidoVenda[0]['valorTotal'] = valorTotal

        this.pedidoVendaServ.save(req, user, pedidoVenda[0])

        return super.afterSave(req, dto, user, model)
    }

}