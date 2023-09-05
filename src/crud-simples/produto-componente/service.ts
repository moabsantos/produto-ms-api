import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { ProdutoComponente } from "./crud.entity";
import { ProdutoComponenteUser } from "./crud-user.entity";

import { UnidadeMedidaService } from "../unidade-medida/service";
import { ProdutoService } from "../produto/service";
import { EstagioService } from "../estagio/service";

export class ProdutoComponenteService extends BaseCrudService{

    private produto: any;
    private estagio: any;
    private componente: any;
    private unidadeProducao: any;
    private unidadeConsumo: any;

    constructor (
        @InjectRepository(ProdutoComponente) protected repo,
        @InjectRepository(ProdutoComponenteUser) protected repoUser,
        private produtoServ: ProdutoService,
        private unidadeServ: UnidadeMedidaService,
        private estagioServ: EstagioService )
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: ProdutoComponente){

        model.sequencia = dto.sequencia
        model.numeroAlternativa = dto.numeroAlternativa

        model.produtoId = this.produto.id
        model.produtoName = this.produto.name

        model.quantidadeProducao = dto.quantidadeProducao

        model.unidadeMedidaProducaoName = this.unidadeProducao.name
        model.unidadeMedidaProducaoSigla = this.unidadeProducao.sigla
        model.unidadeMedidaProducaoId = this.unidadeProducao.id

        model.componenteId = this.componente.id
        model.componenteName = this.componente.name

        model.consumoProducao = dto.consumoProducao

        model.unidadeMedidaConsumoName = this.unidadeConsumo.name
        model.unidadeMedidaConsumoSigla = this.unidadeConsumo.sigla
        model.unidadeMedidaConsumoId = this.unidadeConsumo.id
        
        model.estagioName = this.estagio.name
        model.estagioSigla = this.estagio.sigla
        model.estagioId = this.estagio.id

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        this.estagio = await this.validateId(this.estagioServ, dto.estagioId, user)
        if (!this.estagio){
            this.logger.error(`O Estagio ${dto.estagioId} não foi encontrado`)
            return false
        }

        if (dto.produtoId == dto.componenteId) {
            this.logger.error(`O Produto ${dto.produtoId} é o mesmo que o componente`)
            return false
        }

        this.produto = await this.validateId(this.produtoServ, dto.produtoId, user)
        if (!this.produto){
            this.logger.error(`O Produto ${dto.produtoId} não foi encontrado`)
            return false
        }

        this.unidadeProducao = await this.validateId(this.unidadeServ, dto.unidadeMedidaProducaoId, user)
        if (!this.unidadeProducao){
            this.logger.error(`A Unidade de Producao ${dto.unidadeMedidaProducaoId} não foi encontrada`)
            return false
        }

        this.componente = await this.validateId(this.produtoServ, dto.componenteId, user)
        if (!this.componente){
            this.logger.error(`O Componente ${dto.componenteId} não foi encontrado`)
            return false
        }

        this.unidadeConsumo = await this.validateId(this.unidadeServ, dto.unidadeMedidaConsumoId, user)
        if (!this.unidadeConsumo){
            this.logger.error(`A Unidade de Consumo ${dto.unidadeMedidaConsumoId} não foi encontrada`)
            return false
        }

        dto.name = this.produto.id +' - '+ dto.numeroAlternativa +' - '+ dto.sequencia +' - '+ this.componente.id +' - '+ this.estagio.id
        return super.validate(dto, user)

    }

    async replicarComponentes(req: any, user: any, dto: any): Promise<any>{

        const itemOrigem = await this.getById(req, user, dto.itemOrigemId)
        if (!itemOrigem) return

        const itemDestino = await this.getById(req, user, dto.itemDestinoId)
        if (!itemDestino) return

        const compsOrigem = await this.repo.find({where: {realmId: user.realmId, produtoId: dto.itemOrigemId}})
        if (compsOrigem.length == 0) return

        const compsDestino = await this.repo.find({where:{realmId: user.realmId, produtoId: dto.itemDestinoId}})
        if (compsDestino.length != 0) return

        for (let index = 0; index < compsOrigem.length; index++) {
            const c = compsOrigem[index];

            let compD = {
                ...c
            }

            delete compD.id
            compD.produtoId = dto.itemDestinoId

            this.save(req, user, compD)            
        }

        return dto
    }

}