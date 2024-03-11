import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { RequisicaoCompraItem } from "./crud.entity";
import { RequisicaoCompraItemUser } from "./crud-user.entity";
import { ProdutoService } from "../produto/service";
import { UnidadeMedidaService } from "../unidade-medida/service";
import { SetorService } from "../setor/service";
import { CrudRequest } from "@nestjsx/crud";
import { DepositoRequisicaoService } from "../deposito-requisicao/service";
import { RequisicaoCompraService } from "../requisicao-compra/service";

export class RequisicaoCompraItemService extends BaseCrudService{

    private requisicaoCompra: any;
    private item: any;
    private setor: any;
    private unidadeMedida: any;

    constructor (
        @InjectRepository(RequisicaoCompraItem) protected repo,
        @InjectRepository(RequisicaoCompraItemUser) protected repoUser,
        private itemServ: ProdutoService,
        private unidadeMedidaServ: UnidadeMedidaService,
        private setorServ: SetorService,
        private reqCompraServ: RequisicaoCompraService,
        private depositoRequisicaoServ: DepositoRequisicaoService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "sup-compra-req-dig",
            update: "sup-compra-req-dig",
            delete: "sup-compra-req-dig",
            get: "sup-compra-req-dig",
            aprovar: "sup-compra-req-aprov",
            atender: "sup-compra-req-aten",
        })
    }

    getDataFromDto(dto: any, user: any, model: RequisicaoCompraItem){
 
        if (!model.statusItem || model.statusItem == 'Pendente'){

            model.requisicaoCompraId = this.requisicaoCompra.id

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

        this.requisicaoCompra = await this.validateId(this.reqCompraServ, dto.requisicaoCompraId, user)
        if (!this.requisicaoCompra){
            this.logger.error(`A requisição ${dto.requisicaoCompraId} não foi encontrada`)
            return false
        }

        this.setor = await this.validateId(this.setorServ, dto.setorId, user)
        if (!this.setor){
            this.logger.error(`A setor ${dto.setorId} não foi encontrado`)
            return false
        }

        this.item = await this.validateId(this.itemServ, dto.itemId, user)
        if (!this.item){
            this.logger.error(`O item ${dto.itemId} não foi encontrado`)
            return false
        }

        this.unidadeMedida = await this.validateId(this.unidadeMedidaServ, dto.unidadeMedidaId, user)
        if (!this.unidadeMedida){
            this.logger.error(`A Unidade de Medida ${dto.unidadeMedidaId} não foi encontrada`)
            return false
        }

        dto.name = dto.requisicaoCompraId +' - '+this.setor.id +' - '+ this.item.id +' - '+  this.unidadeMedida.id +' - '+ dto.sequencia  
        dto.code = dto.name

        return super.validate(dto, user)
    }

    async mudaStatusRequisicao(req: CrudRequest, user: any, requisicaoCompraId: number, statusOrigem: string, statusDestino: string): Promise<any>{

        const itensRequisicao = await this.repo.find({where:{requisicaoCompraId: requisicaoCompraId, idUserSelecao: user.userId, realmId: user.realmId}})

        if (itensRequisicao.length < 1) return this.getMessage(req, user, this, {status: 'error', message: 'Itens para o Id da Requisição não encontrados'})

        const reqCompra = await this.reqCompraServ['repo'].find({where:{id: itensRequisicao[0].requisicaoCompraId, realmId: user.realmId}})

        if (reqCompra.length < 1) throw new Error('Requisição não encontrada para o Id')

        for (let index = 0; index < itensRequisicao.length; index++) {
            const element = itensRequisicao[index];
            
            if (element.statusItem == statusOrigem){

                await this.repo.save({
                    id: element.id, 
                    statusItem: statusDestino, 
                    dataAprovacao: new Date(),
                    idUserSelecao: 0
                })

            }

        }

        await this.setRequisicaoStatusItem(req, user, requisicaoCompraId)

        return {}

    }

    async aprovacaoFullList(req: CrudRequest, user: any, requisicaoCompraId: number): Promise<any>{

        return this.mudaStatusRequisicao(req, user, requisicaoCompraId, 'Pendente', 'Aprovado')

    }

    async cancelarAprovacaoFullList(req: CrudRequest, user: any, requisicaoCompraId: number): Promise<any>{

        return this.mudaStatusRequisicao(req, user, requisicaoCompraId, 'Aprovado', 'Pendente')

    }

    async cancelarRequisicaoFullList(req: CrudRequest, user: any, requisicaoCompraId: number): Promise<any>{

        return this.mudaStatusRequisicao(req, user, requisicaoCompraId, 'Pendente', 'Cancelado')

    }

    async setRequisicaoStatusItem(req: CrudRequest, user: any, requisicaoCompraId: number): Promise<any>{

        const itensRequisicao = await this.repo.find({where:{requisicaoCompraId: requisicaoCompraId, realmId: user.realmId}})

        if (itensRequisicao.length < 1) return

        let qtdsStatus = {
            Cancelado: 0,
            Pendente: 0,
            Aprovado: 0,
            Pedido: 0
        }

        itensRequisicao.forEach(element => {
            qtdsStatus[element.statusItem] = qtdsStatus[element.statusItem] +1
        });

        let statusFinal = 'Pendente'
        if (qtdsStatus.Cancelado == itensRequisicao.length) statusFinal = 'Cancelado'
        if (qtdsStatus.Aprovado > 0 && qtdsStatus.Pendente == 0) statusFinal = 'Aprovado'
        if (qtdsStatus.Pedido > 0 && qtdsStatus.Aprovado == 0 && qtdsStatus.Pendente == 0) statusFinal = 'Pedido'
        
        const reqCompra = await this.reqCompraServ['repo'].find({where:{id: requisicaoCompraId, realmId: user.realmId}})
        if (reqCompra[0].statusItem == statusFinal) return

        reqCompra[0].statusItem = statusFinal

        await this.reqCompraServ['repo'].save(reqCompra[0])

    }

    async afterSave(req: any, dto: any, user: any, model: RequisicaoCompraItem) {

        await this.setRequisicaoStatusItem(req, user, model.requisicaoCompraId)

        return await super.afterSave(req, dto, user, model)

    }

}