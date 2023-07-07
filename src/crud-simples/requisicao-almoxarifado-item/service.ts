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

        this.setRole({
            create: "sup-almox-req-dig",
            update: "sup-almox-req-dig",
            delete: "sup-almox-req-dig",
            get: "sup-almox-req-dig",
            aprovar: "sup-almox-req-aprov",
            atender: "sup-almox-req-aten",
        })
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

    async aprovacaoFullList(req: CrudRequest, user: any, requisicaoAlmoxarifadoId: number): Promise<any>{

        const itensRequisicao = await this.repo.find({where:{requisicaoAlmoxarifadoId: requisicaoAlmoxarifadoId}})

        if (itensRequisicao.length < 1) throw new Error('Itens para o Id da Requisição não encontrados')

        const reqAlmox = await this.requisicaoAlmoxServ['repo'].find({where:{id: itensRequisicao[0].requisicaoAlmoxarifadoId}})

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

                    quantidadeOrigemName: 'Disponivel',
                    quantidadeDestinoName: 'Requisitada',

                    origemRequisicaoName: 'RequisicaoAlmoxarifadoItem'
                })
            }

        }

        await this.setRequisicaoStatusItem(req, user, requisicaoAlmoxarifadoId)

        return {}
    }

    async cancelarAprovacaoFullList(req: CrudRequest, user: any, requisicaoAlmoxarifadoId: number): Promise<any>{

        const itensRequisicao = await this.repo.find({where:{requisicaoAlmoxarifadoId: requisicaoAlmoxarifadoId}})

        if (itensRequisicao.length < 1) throw new Error('Itens para o Id da Requisição não encontrados')

        const reqAlmox = await this.requisicaoAlmoxServ['repo'].find({where:{id: itensRequisicao[0].requisicaoAlmoxarifadoId}})

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

                    quantidadeOrigemName: 'Requisitada',
                    quantidadeDestinoName: 'Disponivel',

                    origemRequisicaoName: 'RequisicaoAlmoxarifadoItem'
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

                    quantidadeOrigemName: 'Requisitada',
                    quantidadeDestinoName: 'Separada',

                    origemRequisicaoName: 'RequisicaoAlmoxarifadoItem'
                })
            }
        }

        await this.setRequisicaoStatusItem(req, user, requisicaoAlmoxarifadoId)

        return {}
    }

    async cancelarSeparacaoFullList(req: CrudRequest, user: any, requisicaoAlmoxarifadoId: number): Promise<any>{

        const itensRequisicao = await this.repo.find({where:{requisicaoAlmoxarifadoId: requisicaoAlmoxarifadoId}})

        if (itensRequisicao.length < 1) throw new Error('Itens para o Id da Requisição não encontrados')

        const reqAlmox = await this.requisicaoAlmoxServ['repo'].find({where:{id: itensRequisicao[0].requisicaoAlmoxarifadoId}})

        if (reqAlmox.length < 1) throw new Error('Requisição não encontrada para o Id')

        for (let index = 0; index < itensRequisicao.length; index++) {
            const element = itensRequisicao[index];
            
            if (element.statusItem == 'Separado'){

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

                    quantidadeOrigemName: 'Separada',
                    quantidadeDestinoName: 'Requisitada',

                    origemRequisicaoName: 'RequisicaoAlmoxarifadoItem'
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

                    quantidadeOrigemName: 'Separada',
                    quantidadeDestinoName: 'Entregue',

                    origemRequisicaoName: 'RequisicaoAlmoxarifadoItem'
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