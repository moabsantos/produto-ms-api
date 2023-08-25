import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoCompraItem } from "./crud.entity";
import { PedidoCompraItemUser } from "./crud-user.entity";
import { ProdutoService } from "../produto/service";
import { UnidadeMedidaService } from "../unidade-medida/service";
import { SetorService } from "../setor/service";
import { CrudRequest } from "@nestjsx/crud";
import { DepositoRequisicaoService } from "../deposito-requisicao/service";
import { PedidoCompraService } from "../pedido-compra/service";
import { RequisicaoCompraItemService } from "../requisicao-compra-item/service";

export class PedidoCompraItemService extends BaseCrudService{

    private pedidoCompra: any;
    private reqCompraItem: any;
    private item: any;
    private setor: any;
    private unidadeMedida: any;

    constructor (
        @InjectRepository(PedidoCompraItem) protected repo,
        @InjectRepository(PedidoCompraItemUser) protected repoUser,
        private itemServ: ProdutoService,
        private unidadeMedidaServ: UnidadeMedidaService,
        private setorServ: SetorService,
        private pedidoServ: PedidoCompraService,
        private reqCompraItemServ: RequisicaoCompraItemService,
        private depositoRequisicaoServ: DepositoRequisicaoService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "sup-compr-ped-dig",
            update: "sup-compr-ped-dig",
            delete: "sup-compr-ped-dig",
            get: "sup-compr-ped-dig",
            aprovar: "sup-compr-ped-aprov",
            atender: "sup-compr-ped-aten",
        })
    }

    getDataFromDto(dto: any, user: any, model: PedidoCompraItem){
 
        if (!model.statusItem || model.statusItem == 'Pendente'){

            model.pedidoCompraId = dto.pedidoCompraId

            model.itemDescription = this.item.description
            model.itemCode = this.item.code
            model.itemName = this.item.name
            model.itemSigla = this.item.sigla
            model.itemId = dto.itemId
            model.description = dto.description
            model.sequencia = dto.sequencia
    
            model.quantidadeSolicitada = dto.quantidadeSolicitada
    
            model.unidadeMedidaName = this.unidadeMedida.name
            model.unidadeMedidaSigla = this.unidadeMedida.sigla
            model.unidadeMedidaId = dto.unidadeMedidaId
    
            model.setorName = this.setor.name
            model.setorSigla = this.setor.sigla
            model.setorId = dto.setorId

        }


        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!dto.pedidoCompraId || !dto.setorId || !dto.itemId || !dto.unidadeMedidaId) return false
        
        if (dto.pedidoCompraId){
            this.pedidoCompra = await this.validateId(this.setorServ, dto.setorId, user)
            if (!this.pedidoCompra){
                this.logger.error(`A Requisição de Almoxarifado ${dto.pedidoCompraId} não foi encontrada`)
                return false
            }
        }

        if (dto.setorId){
            this.setor = await this.validateId(this.setorServ, dto.setorId, user)
            if (!this.setor){
                this.logger.error(`A setor ${dto.setorId} não foi encontrado`)
                return false
            }
        }

        if (dto.itemId){
            this.item = await this.validateId(this.itemServ, dto.itemId, user)
            if (!this.item){
                this.logger.error(`O item ${dto.itemId} não foi encontrado`)
                return false
            }
        }

        if (dto.unidadeMedidaId){
            this.unidadeMedida = await this.validateId(this.unidadeMedidaServ, dto.unidadeMedidaId, user)
            if (!this.item){
                this.logger.error(`A Unidade de Medida ${dto.unidadeMedidaId} não foi encontrada`)
                return false
            }
        }

        dto.name = dto.pedidoCompraId +' - '+this.setor.id +' - '+ this.item.id +' - '+  this.unidadeMedida.id +' - '+ dto.sequencia  
        dto.code = dto.name

        return super.validate(dto, user)
    }

    async aprovacaoFullList(req: CrudRequest, user: any, pedidoCompraId: number): Promise<any>{
        
        if (!pedidoCompraId) return

        const itensRequisicao = await this.repo.find({where: {pedidoCompraId: pedidoCompraId, statusItem: 'Pendente', idUserSelecao: user.userId}})

        if (itensRequisicao.length < 1) throw new Error('Itens para o Id da Requisição não encontrados')

        const reqAlmox = await this.pedidoServ['repo'].find({where:{id: itensRequisicao[0].pedidoCompraId}})

        if (reqAlmox.length < 1) throw new Error('Requisição não encontrada para o Id')

        for (let index = 0; index < itensRequisicao.length; index++) {
            const element = itensRequisicao[index];
            
            if (element.statusItem == 'Pendente'){

                await this.repo.save({id: element.id, statusItem: 'Aprovado', dataAprovacao: new Date()})

                await this.depositoRequisicaoServ.movimentacao(req, user, {
                    id: element.id, 

                    capa: reqAlmox[0],
                    lote: {
                        id: 0,
                        code: "*"
                    },

                    item: element,
                    quantidadeEntregue: Number(element.quantidadeSolicitada),

                    depositoIdOrigem: reqAlmox[0].depositoIdOrigem,
                    depositoCodeOrigem: reqAlmox[0].depositoCodeOrigem,
                    depositoNameOrigem: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaOrigem: reqAlmox[0].depositoSiglaOrigem,

                    depositoIdDestino: reqAlmox[0].depositoIdOrigem,
                    depositoCodeDestino: reqAlmox[0].depositoCodeOrigem,
                    depositoNameDestino: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaDestino: reqAlmox[0].depositoSiglaOrigem,

                    quantidadeOrigemName: 'Fornecedor',
                    quantidadeDestinoName: 'Pedida',

                    origemRequisicaoName: 'PedidoCompraItem'
                })
            }

        }

        await this.setRequisicaoStatusItem(req, user, pedidoCompraId)

        return {}
    }

    async cancelarAprovacaoFullList(req: CrudRequest, user: any, pedidoCompraId: number): Promise<any>{

        if (!pedidoCompraId) return

        const itensRequisicao = await this.repo.find({where:{pedidoCompraId: pedidoCompraId, statusItem: 'Aprovado', idUserSelecao: user.userId}})

        if (itensRequisicao.length < 1) throw new Error('Itens para o Id da Requisição não encontrados')

        const reqAlmox = await this.pedidoServ['repo'].find({where:{id: itensRequisicao[0].pedidoCompraId}})

        if (reqAlmox.length < 1) throw new Error('Requisição não encontrada para o Id')

        for (let index = 0; index < itensRequisicao.length; index++) {
            const element = itensRequisicao[index];
            
            if (element.statusItem == 'Aprovado'){

                await this.repo.save({id: element.id, statusItem: 'Pendente', dataAprovacao: new Date()})

                await this.depositoRequisicaoServ.movimentacao(req, user, {
                    id: element.id, 

                    capa: reqAlmox[0],
                    lote: {
                        id: 0,
                        code: "*"
                    },

                    item: element,
                    quantidadeEntregue: Number(element.quantidadeSolicitada),

                    depositoIdOrigem: reqAlmox[0].depositoIdOrigem,
                    depositoCodeOrigem: reqAlmox[0].depositoCodeOrigem,
                    depositoNameOrigem: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaOrigem: reqAlmox[0].depositoSiglaOrigem,

                    depositoIdDestino: reqAlmox[0].depositoIdOrigem,
                    depositoCodeDestino: reqAlmox[0].depositoCodeOrigem,
                    depositoNameDestino: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaDestino: reqAlmox[0].depositoSiglaOrigem,

                    quantidadeOrigemName: 'Pedida',
                    quantidadeDestinoName: 'Fornecedor',

                    origemRequisicaoName: 'PedidoCompraItem'
                })
            }

        }

        await this.setRequisicaoStatusItem(req, user, pedidoCompraId)

        return {}
    }

    async separacaoFullList(req: CrudRequest, user: any, pedidoCompraId: number): Promise<any>{

        if (!pedidoCompraId) return

        const itensRequisicao = await this.repo.find({where:{pedidoCompraId: pedidoCompraId, statusItem: 'Aprovado', idUserSelecao: user.userId}})

        if (itensRequisicao.length < 1) throw new Error('Itens para o Id da Requisição não encontrados')

        const reqAlmox = await this.pedidoServ['repo'].find({where:{id: itensRequisicao[0].pedidoCompraId}})

        if (reqAlmox.length < 1) throw new Error('Requisição não encontrada para o Id')

        for (let index = 0; index < itensRequisicao.length; index++) {
            const element = itensRequisicao[index];
            
            if (element.statusItem == 'Aprovado'){

                await this.repo.save({id: element.id, statusItem: 'Faturado', dataSeparacao: new Date()})

                await this.depositoRequisicaoServ.movimentacao(req, user, {
                    id: element.id, 

                    capa: reqAlmox[0],
                    lote: {
                        id: 0,
                        code: "*"
                    },

                    item: element,
                    quantidadeEntregue: Number(element.quantidadeSolicitada),

                    depositoIdOrigem: reqAlmox[0].depositoIdOrigem,
                    depositoCodeOrigem: reqAlmox[0].depositoCodeOrigem,
                    depositoNameOrigem: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaOrigem: reqAlmox[0].depositoSiglaOrigem,

                    depositoIdDestino: reqAlmox[0].depositoIdOrigem,
                    depositoCodeDestino: reqAlmox[0].depositoCodeOrigem,
                    depositoNameDestino: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaDestino: reqAlmox[0].depositoSiglaOrigem,

                    quantidadeOrigemName: 'Pedida',
                    quantidadeDestinoName: 'Faturada',

                    origemRequisicaoName: 'PedidoCompraItem'
                })
            }
        }

        await this.setRequisicaoStatusItem(req, user, pedidoCompraId)

        return {}
    }

    async cancelarSeparacaoFullList(req: CrudRequest, user: any, pedidoCompraId: number): Promise<any>{

        if (!pedidoCompraId) return

        const itensRequisicao = await this.repo.find({where:{pedidoCompraId: pedidoCompraId, statusItem: 'Faturado', idUserSelecao: user.userId}})

        if (itensRequisicao.length < 1) throw new Error('Itens para o Id da Requisição não encontrados')

        const reqAlmox = await this.pedidoServ['repo'].find({where:{id: itensRequisicao[0].pedidoCompraId}})

        if (reqAlmox.length < 1) throw new Error('Requisição não encontrada para o Id')

        for (let index = 0; index < itensRequisicao.length; index++) {
            const element = itensRequisicao[index];
            
            if (element.statusItem == 'Faturado'){

                await this.repo.save({id: element.id, statusItem: 'Aprovado', dataSeparacao: new Date()})

                await this.depositoRequisicaoServ.movimentacao(req, user, {
                    id: element.id, 

                    capa: reqAlmox[0],
                    lote: {
                        id: 0,
                        code: "*"
                    },

                    item: element,
                    quantidadeEntregue: Number(element.quantidadeSolicitada),

                    depositoIdOrigem: reqAlmox[0].depositoIdOrigem,
                    depositoCodeOrigem: reqAlmox[0].depositoCodeOrigem,
                    depositoNameOrigem: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaOrigem: reqAlmox[0].depositoSiglaOrigem,

                    depositoIdDestino: reqAlmox[0].depositoIdOrigem,
                    depositoCodeDestino: reqAlmox[0].depositoCodeOrigem,
                    depositoNameDestino: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaDestino: reqAlmox[0].depositoSiglaOrigem,

                    quantidadeOrigemName: 'Faturada',
                    quantidadeDestinoName: 'Pedida',

                    origemRequisicaoName: 'PedidoCompraItem'
                })
            }
        }

        await this.setRequisicaoStatusItem(req, user, pedidoCompraId)

        return {}
    }

    async atendimentoFullList(req: CrudRequest, user: any, pedidoCompraId: number): Promise<any>{

        if (!pedidoCompraId) return

        const itensRequisicao = await this.repo.find({where:{pedidoCompraId: pedidoCompraId}})

        if (itensRequisicao.length < 1) throw new Error('Itens para o Id da Requisição não encontrados')

        const reqAlmox = await this.pedidoServ['repo'].find({where:{id: itensRequisicao[0].pedidoCompraId}})

        if (reqAlmox.length < 1) throw new Error('Requisição não encontrada para o Id')

        for (let index = 0; index < itensRequisicao.length; index++) {
            const element = itensRequisicao[index];
            
            if (element.statusItem == 'Faturado'){

                await this.repo.save({id: element.id, quantidadeEntregue: Number(element.quantidadeSolicitada), statusItem: 'Recebido', dataEntrega: new Date()})

                await this.depositoRequisicaoServ.movimentacao(req, user, {
                    id: element.id, 
                    capa: reqAlmox[0],
                    lote: {
                        id: 0,
                        code: "*"
                    },
                    
                    item: element,
                    quantidadeEntregue: Number(element.quantidadeSolicitada),

                    depositoIdOrigem: reqAlmox[0].depositoIdOrigem,
                    depositoCodeOrigem: reqAlmox[0].depositoCodeOrigem,
                    depositoNameOrigem: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaOrigem: reqAlmox[0].depositoSiglaOrigem,
    
                    depositoIdDestino: reqAlmox[0].depositoIdDestino,
                    depositoCodeDestino: reqAlmox[0].depositoCodeDestino,
                    depositoNameDestino: reqAlmox[0].depositoNameDestino,
                    depositoSiglaDestino: reqAlmox[0].depositoSiglaDestino,

                    quantidadeOrigemName: 'Faturada',
                    quantidadeDestinoName: 'Recebida',

                    origemRequisicaoName: 'PedidoCompraItem'
                })

            }
        }

        await this.setRequisicaoStatusItem(req, user, pedidoCompraId)

        return {}

    }

    async enderecadoFullList(req: CrudRequest, user: any, pedidoCompraId: number): Promise<any>{

        if (!pedidoCompraId) return

        const itens = await this.repo.find({where:{pedidoCompraId: pedidoCompraId, statusItem: 'Recebido', idUserSelecao: user.userId}})

        if (itens.length < 1) throw new Error('Itens para o Id da Requisição não encontrados')

        const reqAlmox = await this.pedidoServ['repo'].find({where:{id: itens[0].pedidoCompraId}})

        if (reqAlmox.length < 1) throw new Error('Requisição não encontrada para o Id')

        for (let index = 0; index < itens.length; index++) {
            const element = itens[index];
            
            if (element.statusItem == 'Recebido'){

                await this.repo.save({id: element.id, quantidadeEntregue: Number(element.quantidadeSolicitada), statusItem: 'Enderecado'})

                await this.depositoRequisicaoServ.movimentacao(req, user, {
                    id: element.id, 
                    capa: reqAlmox[0],
                    lote: {
                        id: 0,
                        code: "*"
                    },
                    
                    item: element,
                    quantidadeEntregue: Number(element.quantidadeSolicitada),

                    depositoIdOrigem: reqAlmox[0].depositoIdDestino,
                    depositoCodeOrigem: reqAlmox[0].depositoCodeDestino,
                    depositoNameOrigem: reqAlmox[0].depositoNameDestino,
                    depositoSiglaOrigem: reqAlmox[0].depositoSiglaDestino,
    
                    depositoIdDestino: reqAlmox[0].depositoIdDestino,
                    depositoCodeDestino: reqAlmox[0].depositoCodeDestino,
                    depositoNameDestino: reqAlmox[0].depositoNameDestino,
                    depositoSiglaDestino: reqAlmox[0].depositoSiglaDestino,

                    quantidadeOrigemName: 'Recebida',
                    quantidadeDestinoName: 'Disponivel',

                    origemRequisicaoName: 'PedidoCompraItem'
                })

            }
        }

        await this.setRequisicaoStatusItem(req, user, pedidoCompraId)

        return {}

    }



    async cancelarFullList(req: CrudRequest, user: any, pedidoCompraId: number): Promise<any>{

        if (!pedidoCompraId) return

        const itens = await this.repo.find({where:{pedidoCompraId: pedidoCompraId, statusItem: 'Pendente', idUserSelecao: user.userId}})

        if (itens.length < 1) throw new Error('Itens para o Id da Requisição não encontrados')

        const reqAlmox = await this.pedidoServ['repo'].find({where:{id: itens[0].pedidoCompraId}})

        if (reqAlmox.length < 1) throw new Error('Requisição não encontrada para o Id')

        for (let index = 0; index < itens.length; index++) {
            const element = itens[index];
            
            if (element.statusItem == 'Pendente'){

                await this.repo.save({id: element.id, quantidadeEntregue: Number(element.quantidadeSolicitada), statusItem: 'Cancelado'})

            }
        }

        await this.setRequisicaoStatusItem(req, user, pedidoCompraId)

        return {}

    }


    async setRequisicaoStatusItem(req: CrudRequest, user: any, pedidoCompraId: number): Promise<any>{

        if (!pedidoCompraId) return

        const itensRequisicao = await this.repo.find({where:{pedidoCompraId: pedidoCompraId, realmId: user.realmId}})

        if (itensRequisicao.length < 1) return

        let qtdsStatus = {
            Cancelado: 0,
            Pendente: 0,
            Aprovado: 0,
            Faturado: 0,
            Recebido: 0,
            Enderecado: 0,
        }

        itensRequisicao.forEach(element => {
            qtdsStatus[element.statusItem] = qtdsStatus[element.statusItem] +1
        });

        let statusFinal = 'Pendente'
        if (qtdsStatus.Cancelado == itensRequisicao.length) statusFinal = 'Cancelado'
        if (qtdsStatus.Aprovado > 0 && qtdsStatus.Pendente == 0) statusFinal = 'Aprovado'
        if (qtdsStatus.Faturado > 0 && qtdsStatus.Aprovado == 0 && qtdsStatus.Pendente == 0) statusFinal = 'Faturado'
        if (qtdsStatus.Recebido > 0 && qtdsStatus.Faturado == 0 && qtdsStatus.Aprovado == 0 && qtdsStatus.Pendente == 0) statusFinal = 'Recebido'
        if (qtdsStatus.Enderecado > 0 && qtdsStatus.Recebido == 0 && qtdsStatus.Faturado == 0 && qtdsStatus.Aprovado == 0 && qtdsStatus.Pendente == 0) statusFinal = 'Enderecado'
        
        const reqAlmox = await this.pedidoServ['repo'].find({where:{id: pedidoCompraId, realmId: user.realmId}})
        if (reqAlmox[0].statusItem == statusFinal) return

        reqAlmox[0].statusItem = statusFinal
        reqAlmox[0].dataEntrega = statusFinal == 'Recebido' ? new Date() : reqAlmox[0].dataEntrega

        await this.pedidoServ['repo'].save(reqAlmox[0])

    }


    async importarRequisicaoCompra(req: any, user: any, idPedido: number): Promise<any>{

        const pedidos = await this.pedidoServ['repo'].find({where: {
            id: idPedido, 
            statusItem: 'Pendente',
            realmId: user.realmId
        }})

        if (pedidos.length < 1) return {}

        const itens = await this.reqCompraItemServ['repo'].find({where:{
            idUserSelecao: user.userId, 
            pedidoCompraId: 0, 
            statusItem: 'Aprovado',
            realmId: user.realmId}})

        if (itens.length < 1) return {}

        for (let index = 0; index < itens.length; index++) {
            const itemReq = itens[index];

            const itensPedRef = await this.repo.find({where:{pedidoCompraId: idPedido, itemId: itemReq.itemId, realmId: user.realmId}})
            let novoSeqItem = 1
            for (let index = 0; index < itensPedRef.length; index++) {
                const element = itensPedRef[index];
                if (element.sequencia > novoSeqItem) novoSeqItem = element.sequencia +1
            }

            const itensPed = await this.repo.find({where:{
                pedidoCompraId: idPedido, 
                itemId: itemReq.itemId,
                setorId: itemReq.setorId,
                statusItem:'Pendente', 
                realmId: user.realmId
            }})
            
            let itemPedido = itensPed.length >= 1 ? itensPed[0] : null
            if (itensPed.length < 1) itemPedido = {
                pedidoCompraId: idPedido, itemId: itemReq.itemId, statusItem:'Pendente', realmId: user.realmId,
                setorId: itemReq.setorId,
                sequencia: novoSeqItem,
                unidadeMedidaId: itemReq.unidadeMedidaId,
                quantidadeSolicitada: 0.00000,
            }

            itemPedido.quantidadeSolicitada = Number(itemPedido.quantidadeSolicitada) + Number(itemReq.quantidadeSolicitada)
            itemReq.idUserSelecao = 0
            itemReq.pedidoCompraId = idPedido
            itemReq.pedidoCompraCode = pedidos[0].code
            itemReq.statusItem = 'Em Pedido'

            await this.save(req, user, itemPedido)
            await this.reqCompraItemServ['repo'].save(itemReq)
        }

        return {id: idPedido, idUserSelecao: itens}

    }


    async afterSave(req: any, dto: any, user: any, model: PedidoCompraItem) {

        await this.setRequisicaoStatusItem(req, user, model.pedidoCompraId)

        return await super.afterSave(req, dto, user, model)

    }

}