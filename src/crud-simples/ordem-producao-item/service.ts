import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { OrdemProducaoItem } from "./crud.entity";
import { OrdemProducaoItemUser } from "./crud-user.entity";
import { PedidoVendaService } from "../pedido-venda/service";
import { ProdutoService } from "../produto/service";
import { EstagioService } from "../estagio/service";
import { UnidadeMedidaService } from "../unidade-medida/service";
import { OrdemProducaoService } from "../ordem-producao/service";

export class OrdemProducaoItemService extends BaseCrudService{

    ordemProducao: any
    pedido: any
    produto: any
    estagio: any
    unidadeMedida: any


    constructor (
        @InjectRepository(OrdemProducaoItem) protected repo,
        @InjectRepository(OrdemProducaoItemUser) protected repoUser,
        private ordemServ: OrdemProducaoService,
        private pedidoServ: PedidoVendaService,
        private produtoServ: ProdutoService,
        private estagioServ: EstagioService,
        private unidadeServ: UnidadeMedidaService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: OrdemProducaoItem){

        model.ordemProducaoId = dto.ordemProducaoId
        model.sequencia = dto.sequencia

        if (dto.pedidoVendaId){
            model.clienteId = this.pedido.clienteId
            model.clienteName = this.pedido.clienteName
            model.clienteSigla = this.pedido.clienteSigla

            model.cidadeId = this.pedido.cidadeId
            model.cidadeName = this.pedido.cidadeName
            model.cidadeSigla = this.pedido.cidadeSigla
        }

        model.produtoId = this.produto.id
        model.produtoName = this.produto.name
        model.produtoSigla = this.produto.sigla
        model.produtoDescription = this.produto.description

        model.estagioId = this.estagio.id
        model.estagioName = this.estagio.name
        model.estagioSigla = this.estagio.sigla
        model.estagioDescription = this.estagio.description

        model.quantidadeSolicitada = dto.quantidadeSolicitada
        model.quantidadeEntregue = dto.quantidadeEntregue

        model.unidadeMedidaId = this.unidadeMedida.id
        model.unidadeMedidaName = this.unidadeMedida.name
        model.unidadeMedidaSigla = this.unidadeMedida.sigla

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        if (dto.pedidoVendaId){
            this.pedido = await this.validateId(this.pedidoServ, dto.pedidoVendaId, user)
            if (!this.pedido){
                this.logger.error(`O Pedido ${dto.pedidoVendaId} não foi encontrado`)
                return false
            }
        }

        this.ordemProducao = await this.validateId(this.ordemServ, dto.proutoId, user)
        if (!this.ordemProducao){
            this.logger.error(`A Ordem de Producao ${dto.ordemProducaoId} não foi encontrada`)
            return false
        }

        this.produto = await this.validateId(this.produtoServ, dto.produtoId, user)
        if (!this.produto){
            this.logger.error(`O Produto ${dto.produtoId} não foi encontrado`)
            return false
        }

        this.unidadeMedida = await this.validateId(this.unidadeServ, dto.unidadeMedidaId, user)
        if (!this.unidadeMedida){
            this.logger.error(`A Unidade Medida ${dto.unidadeMedidaId} não foi encontrada`)
            return false
        }

        this.estagio = await this.validateId(this.estagioServ, dto.estagioId, user)
        if (!this.estagio){
            this.logger.error(`O Estagio ${dto.estagioId} não foi encontrado`)
            return false
        }

        dto.name = this.ordemProducao.id +'-'+ dto.sequencia +'-'+ this.produto.id
        return super.validate(dto, user)

    }

    async afterSave(req: any, dto: any, user: any, model: OrdemProducaoItem) {

        const itens = await this.repo.find({where:{
            ordemProducaoId: dto.ordemProducaoId,
            realmId: user.realmId
        }})

        let qtdSolicitada = 0
        let qtdEntregue = 0

        itens.forEach(element => {
            qtdSolicitada = qtdSolicitada + element['quantidadeSolicitada']
            qtdEntregue = qtdEntregue + element['quantidadeEntregue']
        });

        const ordem = await this.ordemServ.findByWhere({
            id: dto.ordemProducaoId,
            realmId: user.realmId
        })

        ordem[0]['quantidadeItens'] = qtdSolicitada
        ordem[0]['valorDesconto'] = qtdEntregue

        this.ordemServ.save(req, user, ordem[0])

        return super.afterSave(req, dto, user, model)
    }

}