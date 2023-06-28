import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { RequisicaoAlmoxarifadoItem } from "./crud.entity";
import { RequisicaoAlmoxarifadoItemUser } from "./crud-user.entity";
import { ProdutoService } from "../produto/service";
import { UnidadeMedidaService } from "../unidade-medida/service";
import { SetorService } from "../setor/service";
import { CrudRequest } from "@nestjsx/crud";
import { DepositoRequisicaoService } from "../deposito-requisicao/service";
import { RequisicaoAlmoxarifadoService } from "../requisicao-almoxarifado/service";

export class RequisicaoAlmoxarifadoItemService extends BaseCrudService{

    private requisicaoAlmoxarifado: any;
    private item: any;
    private setor: any;
    private unidadeMedida: any;

    constructor (
        @InjectRepository(RequisicaoAlmoxarifadoItem) protected repo,
        @InjectRepository(RequisicaoAlmoxarifadoItemUser) protected repoUser,
        private itemServ: ProdutoService,
        private unidadeMedidaServ: UnidadeMedidaService,
        private setorServ: SetorService,
        private requisicaoAlmoxServ: RequisicaoAlmoxarifadoService,
        private depositoRequisicaoServ: DepositoRequisicaoService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: RequisicaoAlmoxarifadoItem){
 
        if (!model.statusItem || model.statusItem == 'Pendente'){

            model.requisicaoAlmoxarifadoId = dto.requisicaoAlmoxarifadoId

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

        if (dto.requisicaoAlmoxarifadoId){
            this.requisicaoAlmoxarifado = await this.validateId(this.setorServ, dto.setorId, user)
            if (!this.requisicaoAlmoxarifado){
                this.logger.error(`A Requisição de Almoxarifado ${dto.requisicaoAlmoxarifadoId} não foi encontrada`)
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

        dto.name = dto.requisicaoAlmoxarifadoId +' - '+this.setor.id +' - '+ this.item.id +' - '+  this.unidadeMedida.id +' - '+ dto.sequencia  
        dto.code = dto.name

        return super.validate(dto, user)
    }

    async movimentacao(req: CrudRequest, user: any, dto: any): Promise<any>{

        const origemRequisicaoName = 'RequisicaoAlmoxarifadoItem'

        const qtdsName = [
            'Disponivel', 'Requisitada', 'Separada', 'Entregue', 'Reservada', 'Bloqueada', 'Aprovada', 'Reprovada'
        ]

        if (!dto.quantidadeEntregue) return

        const listReqDeposito = await this.depositoRequisicaoServ['repo'].find({where:{
            origemRequisicaoName: origemRequisicaoName, origemRequisicaoId: dto.id, 
            empresaId: dto.EmpresaId, realmId: user.realmId}})

        let totalEventos = 0

        let qtdEventos = 0

        listReqDeposito.forEach(element => {
            const qtdDisponivel = element['quantidade'+ dto.quantidadeOrigemName + 'Origem']
            if (dto.depositoIdOrigem == element.depositoIdOrigem && dto.depositoIdDestino == element.depositoIdDestino)
             totalEventos = totalEventos + Number(qtdDisponivel)
            if (dto.depositoIdOrigem != dto.depositoIdDestino && dto.depositoIdOrigem == element.depositoIdDestino && dto.depositoIdDestino == element.depositoIdOrigem)
                totalEventos = totalEventos - Number(qtdDisponivel)
            qtdEventos = qtdEventos +1
        });

        if (totalEventos == dto.quantidadeEntregue) return
        
        const novaQtdEvt = dto.quantidadeEntregue - totalEventos
        const codEvt = 'RLM'+ dto.reqAlmox.realmId +'EMP'+ dto.reqAlmox.empresaId +'REQ'+ dto.reqAlmox.id +'REQi'+ dto.reqAlmoxItem.id +'EVT'+ qtdEventos
        let objEvt = {
            code: codEvt,
            name: codEvt,
            
            empresaId: dto.reqAlmox.empresaId,
            empresaName: dto.reqAlmox.empresaName,
            empresaSigla: dto.reqAlmox.empresaSigla,
            
            itemId: dto.reqAlmoxItem.itemId,
            itemCode: dto.reqAlmoxItem.itemCode,
            itemName: dto.reqAlmoxItem.itemName,
            itemSigla: dto.reqAlmoxItem.itemSigla,
            itemDescription: dto.reqAlmoxItem.itemDescription,
        
            unidadeMedidaId: dto.reqAlmoxItem.unidadeMedidaId,
            unidadeMedidaName: dto.reqAlmoxItem.unidadeMedidaName,
            unidadeMedidaSigla: dto.reqAlmoxItem.unidadeMedidaSigla,
        
            loteId: dto.lote.id,
            loteCodigo: dto.lote.code,
        
            setorId: dto.reqAlmoxItem.setorId,
            setorName: dto.reqAlmoxItem.setorName,
            setorSigla: dto.reqAlmoxItem.setorSigla,
        
            depositoIdOrigem: novaQtdEvt > 0 ? dto.depositoIdOrigem : dto.depositoIdDestino,
            depositoCodeOrigem: novaQtdEvt > 0 ? dto.depositoCodeOrigem : dto.depositoCodeDestino,
            depositoNameOrigem: novaQtdEvt > 0 ? dto.depositoNameOrigem : dto.depositoNameDestino,
            depositoSiglaOrigem: novaQtdEvt > 0 ? dto.depositoSiglaOrigem : dto.depositoSiglaDestino,
        
            depositoIdDestino: novaQtdEvt > 0 ? dto.depositoIdDestino : dto.depositoIdOrigem,
            depositoCodeDestino: novaQtdEvt > 0 ? dto.depositoCodeDestino : dto.depositoCodeOrigem,
            depositoNameDestino: novaQtdEvt > 0 ? dto.depositoNameDestino : dto.depositoNameOrigem,
            depositoSiglaDestino: novaQtdEvt > 0 ? dto.depositoSiglaDestino : dto.depositoSiglaOrigem,
            
            origemRequisicaoName: origemRequisicaoName,
            origemRequisicaoId: dto.id
        }
        
        qtdsName.forEach(element => {
            objEvt['quantidade'+ element + 'Origem'] = 0
            objEvt['quantidade'+ element + 'Destino'] = 0
        });
        
        if (novaQtdEvt > 0) {
            objEvt['quantidade'+ dto.quantidadeOrigemName + 'Origem'] = dto.quantidadeEntregue
            objEvt['quantidade'+ dto.quantidadeDestinoName + 'Destino'] = dto.quantidadeEntregue
        }

        if (novaQtdEvt < 0) {
            objEvt['quantidade'+ dto.quantidadeOrigemName + 'Destino'] = dto.quantidadeEntregue
            objEvt['quantidade'+ dto.quantidadeDestinoName + 'Origem'] = dto.quantidadeEntregue
        }

        this.depositoRequisicaoServ.save(req, user, objEvt)

        return null
    }

    async aprovacaoFullList(req: CrudRequest, user: any, requisicaoAlmoxarifadoId: number): Promise<any>{

        const itensRequisicao = await this.repo.find({where:{requisicaoAlmoxarifadoId: requisicaoAlmoxarifadoId}})

        if (itensRequisicao.length < 1) throw new Error('Itens para o Id da Requisição não encontrados')

        const reqAlmox = await this.requisicaoAlmoxServ['repo'].find({where:{id: itensRequisicao[0].requisicaoAlmoxarifadoId}})

        if (reqAlmox.length < 1) throw new Error('Requisição não encontrada para o Id')

        for (let index = 0; index < itensRequisicao.length; index++) {
            const element = itensRequisicao[index];
            
            if (element.statusItem == 'Pendente'){

                await this.repo.save({id: element.id, statusItem: 'Aprovado', dataAprovacao: new Date()})

                await this.movimentacao(req, user, {
                    id: element.id, 

                    reqAlmox: reqAlmox[0],
                    lote: {
                        id: 0,
                        code: "*"
                    },

                    reqAlmoxItem: element,
                    quantidadeEntregue: Number(element.quantidadeSolicitada),

                    depositoIdOrigem: reqAlmox[0].depositoIdOrigem,
                    depositoCodeOrigem: reqAlmox[0].depositoCodeOrigem,
                    depositoNameOrigem: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaOrigem: reqAlmox[0].depositoSiglaOrigem,

                    depositoIdDestino: reqAlmox[0].depositoIdOrigem,
                    depositoCodeDestino: reqAlmox[0].depositoCodeOrigem,
                    depositoNameDestino: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaDestino: reqAlmox[0].depositoSiglaOrigem,

                    quantidadeOrigemName: 'Disponivel',
                    quantidadeDestinoName: 'Requisitada',
                })
            }

        }

        await this.setRequisicaoStatusItem(req, user, requisicaoAlmoxarifadoId)

        return {}
    }

    async separacaoFullList(req: CrudRequest, user: any, requisicaoAlmoxarifadoId: number): Promise<any>{

        const itensRequisicao = await this.repo.find({where:{requisicaoAlmoxarifadoId: requisicaoAlmoxarifadoId}})

        if (itensRequisicao.length < 1) throw new Error('Itens para o Id da Requisição não encontrados')

        const reqAlmox = await this.requisicaoAlmoxServ['repo'].find({where:{id: itensRequisicao[0].requisicaoAlmoxarifadoId}})

        if (reqAlmox.length < 1) throw new Error('Requisição não encontrada para o Id')

        for (let index = 0; index < itensRequisicao.length; index++) {
            const element = itensRequisicao[index];
            
            if (element.statusItem == 'Aprovado'){

                await this.repo.save({id: element.id, statusItem: 'Separado', dataSeparacao: new Date()})

                await this.movimentacao(req, user, {
                    id: element.id, 

                    reqAlmox: reqAlmox[0],
                    lote: {
                        id: 0,
                        code: "*"
                    },

                    reqAlmoxItem: element,
                    quantidadeEntregue: Number(element.quantidadeSolicitada),

                    depositoIdOrigem: reqAlmox[0].depositoIdOrigem,
                    depositoCodeOrigem: reqAlmox[0].depositoCodeOrigem,
                    depositoNameOrigem: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaOrigem: reqAlmox[0].depositoSiglaOrigem,

                    depositoIdDestino: reqAlmox[0].depositoIdOrigem,
                    depositoCodeDestino: reqAlmox[0].depositoCodeOrigem,
                    depositoNameDestino: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaDestino: reqAlmox[0].depositoSiglaOrigem,

                    quantidadeOrigemName: 'Requisitada',
                    quantidadeDestinoName: 'Separada',
                })
            }
        }

        await this.setRequisicaoStatusItem(req, user, requisicaoAlmoxarifadoId)

        return {}
    }

    async atendimentoFullList(req: CrudRequest, user: any, requisicaoAlmoxarifadoId: number): Promise<any>{

        const itensRequisicao = await this.repo.find({where:{requisicaoAlmoxarifadoId: requisicaoAlmoxarifadoId}})

        if (itensRequisicao.length < 1) throw new Error('Itens para o Id da Requisição não encontrados')

        const reqAlmox = await this.requisicaoAlmoxServ['repo'].find({where:{id: itensRequisicao[0].requisicaoAlmoxarifadoId}})

        if (reqAlmox.length < 1) throw new Error('Requisição não encontrada para o Id')

        for (let index = 0; index < itensRequisicao.length; index++) {
            const element = itensRequisicao[index];
            
            if (element.statusItem == 'Separado'){

                await this.repo.save({id: element.id, quantidadeEntregue: Number(element.quantidadeSolicitada), statusItem: 'Entregue', dataEntrega: new Date()})

                await this.movimentacao(req, user, {
                    id: element.id, 
                    reqAlmox: reqAlmox[0],
                    lote: {
                        id: 0,
                        code: "*"
                    },
                    
                    reqAlmoxItem: element,
                    quantidadeEntregue: Number(element.quantidadeSolicitada),

                    depositoIdOrigem: reqAlmox[0].depositoIdOrigem,
                    depositoCodeOrigem: reqAlmox[0].depositoCodeOrigem,
                    depositoNameOrigem: reqAlmox[0].depositoNameOrigem,
                    depositoSiglaOrigem: reqAlmox[0].depositoSiglaOrigem,
    
                    depositoIdDestino: reqAlmox[0].depositoIdDestino,
                    depositoCodeDestino: reqAlmox[0].depositoCodeDestino,
                    depositoNameDestino: reqAlmox[0].depositoNameDestino,
                    depositoSiglaDestino: reqAlmox[0].depositoSiglaDestino,

                    quantidadeOrigemName: 'Separada',
                    quantidadeDestinoName: 'Entregue',
                })

            }
        }

        await this.setRequisicaoStatusItem(req, user, requisicaoAlmoxarifadoId)

        return {}

    }

    async setRequisicaoStatusItem(req: CrudRequest, user: any, requisicaoAlmoxarifadoId: number): Promise<any>{

        const itensRequisicao = await this.repo.find({where:{requisicaoAlmoxarifadoId: requisicaoAlmoxarifadoId}})

        if (itensRequisicao.length < 1) return

        let qtdsStatus = {
            Pendente: 0,
            Aprovado: 0,
            Separado: 0,
            Entregue: 0,
        }

        itensRequisicao.forEach(element => {
            qtdsStatus[element.statusItem] = qtdsStatus[element.statusItem] +1
        });

        let statusFinal = 'Pendente'
        if (qtdsStatus.Aprovado > 0 && qtdsStatus.Pendente == 0) statusFinal = 'Aprovado'
        if (qtdsStatus.Separado > 0 && qtdsStatus.Aprovado == 0 && qtdsStatus.Pendente == 0) statusFinal = 'Separado'
        if (qtdsStatus.Entregue > 0 && qtdsStatus.Separado == 0 && qtdsStatus.Aprovado == 0 && qtdsStatus.Pendente == 0) statusFinal = 'Entregue'

        const reqAlmox = await this.requisicaoAlmoxServ['repo'].find({where:{id: requisicaoAlmoxarifadoId}})
        if (reqAlmox[0].statusItem == statusFinal) return

        reqAlmox[0].statusItem = statusFinal
        reqAlmox[0].dataEntrega = statusFinal == 'Entregue' ? new Date() : null

        await this.requisicaoAlmoxServ['repo'].save(reqAlmox[0])

    }

    async afterSave(req: any, dto: any, user: any, model: RequisicaoAlmoxarifadoItem) {

        await this.setRequisicaoStatusItem(req, user, model.requisicaoAlmoxarifadoId)

        return await super.afterSave(req, dto, user, model)

    }

}