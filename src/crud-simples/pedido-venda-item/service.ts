import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoVendaItem } from "./crud.entity";
import { PedidoVendaItemUser } from "./crud-user.entity";
import { PedidoVendaService } from "../pedido-venda/service";
import { ProdutoService } from "../produto/service";
import e from "express";
import { endWith } from "rxjs";
import { DepositoRequisicaoService } from "../deposito-requisicao/service";
import { UnidadeMedidaService } from "../unidade-medida/service";

export class PedidoVendaItemService extends BaseCrudService{

    pedidoVenda: any
    itemVenda: any
    listStatus = ['Digitação', 'Pendente', 'Aprovado', 'Em Ordem', 'Separado', 'Entregue', 'Cancelado']

    constructor (
        @InjectRepository(PedidoVendaItem) protected repo,
        @InjectRepository(PedidoVendaItemUser) protected repoUser,
        private pedidoVendaServ: PedidoVendaService,
        private unidadeMedidaServ: UnidadeMedidaService,
        private depositoRequisicaoServ: DepositoRequisicaoService,
        private itemVendaServ: ProdutoService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "com-pedido-venda-dig",
            update: "com-pedido-venda-dig",
            delete: "com-pedido-venda-dig",
            get: "com-pedido-venda-get"
        })

        this.modelsRequired = [
            {fieldKey: 'pedidoVendaId', fieldName: 'pedidoVenda', service: this.pedidoVendaServ, fields: [
                'id']},

            {fieldKey: 'pedidoVendaId', fieldName: '', service: this.pedidoVendaServ, fields: [
                'clienteId', 'clienteName', 'clienteSigla',
                'cnpj', 'inscricaoEstadual',
                'email', 'telefone',
                'endereco', 'numero', 'bairro',
                'cidadeId', 'cidadeName', 'cidadeSigla',
            
                'depositoOrigemId', 'depositoOrigemCode', 'depositoOrigemName', 'depositoOrigemSigla', 'depositoOrigemDescription', 
                'depositoDestinoId', 'depositoDestinoCode', 'depositoDestinoName', 'depositoDestinoSigla', 'depositoDestinoDescription']},

            {fieldKey: 'unidadeMedidaId', fieldName: 'unidadeMedida', service: this.unidadeMedidaServ, fields: [
                'id', 'code', 'name', 'sigla']},

            {fieldKey: 'itemVendaId', fieldName: 'itemVenda', service: this.itemVendaServ, fields: [
                'id', 'name', 'sigla', 'description']},
        ]
    }

    getDataFromDto(dto: any, user: any, model: PedidoVendaItem){

        if (!model.statusItem || model.statusItem == 'Digitação'){
            model = this.getDataModelsFromDto(model)

            model = this.getModelFromInputs(model, dto, [
                'sequencia', 'quantidadeSolicitada', 'valorInicialItem', 'percentDescontoItem'])

            let subTotal = Number(dto.valorInicialItem) * Number(model.quantidadeSolicitada)
            subTotal = Math.trunc( ( subTotal * 100 ) + .5) / 100 
            model.valorSubTotalItem = subTotal

            let valorDesconto = dto.percentDescontoItem && dto.percentDescontoItem > 0 ? ( subTotal / 100 ) * dto.percentDescontoItem : 0
            valorDesconto = Math.trunc( ( valorDesconto * 100 ) + .5) / 100 
            model.valorDescontoItem = valorDesconto

            model.valorTotalItem = subTotal - valorDesconto

        }

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        const checkFields = this.validateFieldsRequireds([{name: "sequencia"}], dto)
        if (!checkFields.status) return checkFields

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        dto.name = this.pedidoVenda.id +'-'+ this.pedidoVenda.clienteId +'-'+ dto.sequencia +'-'+ this.itemVenda.id
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
        let subTotal = 0

        itensVenda.forEach(element => {
            if (element['statusItem'] != 'Pendente' && element['statusItem'] != 'Cancelado') {
                qtdTotal = qtdTotal + Number(element['quantidadeSolicitada'])
                subTotal = subTotal + Number(element['valorSubTotalItem'])
                valorDesconto = valorDesconto + Number(element['valorDescontoItem'])
                valorTotal = valorTotal + Number(element['valorTotalItem'])
            }
        });

        await this.pedidoVendaServ.updateRepoId(req, user, {
            id: dto.pedidoVendaId,
            quantidadeItens: qtdTotal,
            valorSubTotalItem: subTotal,
            valorDesconto: valorDesconto,
            valorTotal: valorTotal
        })

        return super.afterSave(req, dto, user, model)
    }

    async movimentaItens(req: any, user: any, payload: any) {

        await this.depositoRequisicaoServ.movimentacao(req, user, {
            id: payload.id, 
            capa: payload.capa,
            lote: {
                id: 0,
                code: "*"
            },
            
            item: payload.item,
            quantidadeEntregue: Number(payload.quantidadeSolicitada),

            depositoIdOrigem: payload.depositoDestino.depositoIdOrigem,
            depositoCodeOrigem: payload.depositoDestino.depositoCodeOrigem,
            depositoNameOrigem: payload.depositoDestino.depositoNameOrigem,
            depositoSiglaOrigem: payload.depositoDestino.depositoSiglaOrigem,

            depositoIdDestino: payload.depositoDestino.depositoIdDestino,
            depositoCodeDestino: payload.depositoDestino.depositoCodeDestino,
            depositoNameDestino: payload.depositoDestino.depositoNameDestino,
            depositoSiglaDestino: payload.depositoDestino.depositoSiglaDestino,

            quantidadeOrigemName: payload.quantidadeOrigem,
            quantidadeDestinoName: payload.quantidadeOrigem,

            origemRequisicaoName: 'PedidoVendaItem'
        })

    }

    async beforeMudaStatusItem(req: any, user: any, dto: any) {

        if (dto.statusItemOrigem == '*' && dto.statusItemDestino == '*') this.movimentaItens(req, user, {

        })

    } 

    async mudaStatusItem(req: any, user: any, dto: any) {
        const obj = await this.getById(req, user, {id: dto.id})

        if (obj.statusItem != dto.statusItemOrigem) return this.getMessage(req, user, this, {status: false, error: true, message: `Item não está no status origem [${dto.statusItemOrigem}]`})

        await this.beforeMudaStatusItem(req, user, dto)

        await this.updateRepoId(req, user, {id: obj.id, statusItem: dto.statusItemDestino})
    }

    async mudaStatusItens(req: any, user: any, dto: any): Promise<any>{

        if (this.listStatus.indexOf(dto.statusItemDestino) < 0) return this.getMessage(req, user, this, {status: false, error: true, message: `Status Destino Inválido [${dto.statusItemDestino}]`})

        let itens = await this.getLista(req, user, {pedidoVendaId: dto.pedidoVendaId, idUserSelecao: user.id, statusItem: dto.statusItemOrigem})

        for (let index = 0; index < itens.length; index++) {
            const element = itens[index];

            await this.mudaStatusItem(req, user, {id: element['id'], statusItemOrigem: dto.statusItemOrigem, statusItemDestino: dto.statusItemDestino})
        }

        let statusFinal = {
            valor: dto.statusItemDestino,
            pos: this.listStatus.indexOf(dto.statusItemDestino)
        }

        itens = await this.getLista(req, user, {pedidoVendaId: dto.pedidoVendaId})
        for (let index = 0; index < itens.length; index++) {
            const element = itens[index];

            if (statusFinal.pos < this.listStatus.indexOf(element.statusItem)) statusFinal = {
                valor: element.statusItem,
                pos: this.listStatus.indexOf(element.statusItem)
            }
        };

        if (itens.length > 0) this.pedidoVendaServ.updateRepoId(req, user, {id: dto.pedidoVendaId, statusItem: statusFinal.valor})

        return this.getMessage(req, user, this, {status: true, error: false, message: `Processo finalizado`})
    }

    async finalizaDigitacaoItens(req: any, user: any, dto: any): Promise<any> {

        return this.mudaStatusItens(req, user, {...dto, statusItemOrigem: 'Digitação', statusItemDestino: 'Pendente'})

    }

    async aprovaItens(req: any, user: any, dto: any): Promise<any> {

        return this.mudaStatusItens(req, user, {...dto, statusItemOrigem: 'Pendente', statusItemDestino: 'Aprovado'})

    }

    async cancelaAprovacaoItens(req: any, user: any, dto: any): Promise<any> {

        return this.mudaStatusItens(req, user, {...dto, statusItemOrigem: 'Aprovado', statusItemDestino: 'Pendente'})
        
    }


    async solicitarOrdemItens(req: any, user: any, dto: any): Promise<any> {

        return this.mudaStatusItens(req, user, {...dto, statusItemOrigem: 'Aprovado', statusItemDestino: 'Em Ordem'})

    }

    async cancelarOrdemItens(req: any, user: any, dto: any): Promise<any> {

        return this.mudaStatusItens(req, user, {...dto, statusItemOrigem: 'Em Ordem', statusItemDestino: 'Aprovado'})

    }

    async separarItens(req: any, user: any, dto: any): Promise<any> {

        return this.mudaStatusItens(req, user, {...dto, statusItemOrigem: 'Em Ordem', statusItemDestino: 'Separado'})

    }

    async cancelarSeparacaoItens(req: any, user: any, dto: any): Promise<any> {

        return this.mudaStatusItens(req, user, {...dto, statusItemOrigem: 'Separado', statusItemDestino: 'Em Ordem'})

    }

    async entregarItens(req: any, user: any, dto: any): Promise<any> {

        return this.mudaStatusItens(req, user, {...dto, statusItemOrigem: 'Separado', statusItemDestino: 'Entregue'})

    }

    async cancelarEntregaItens(req: any, user: any, dto: any): Promise<any> {

        return this.mudaStatusItens(req, user, {...dto, statusItemOrigem: 'Entregue', statusItemDestino: 'Separado'})

    }

    async cancelarItens(req: any, user: any, dto: any): Promise<any> {

        return this.mudaStatusItens(req, user, {...dto, statusItemOrigem: 'Pendente', statusItemDestino: 'Cancelado'})

    }

    async cancelarCancelamentoItens(req: any, user: any, dto: any): Promise<any> {

        return this.mudaStatusItens(req, user, {...dto, statusItemOrigem: 'Cancelado', statusItemDestino: 'Pendente'})

    }
}