import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { UnidadeMedidaService } from "../unidade-medida/service";
import { ProdutoService } from "../produto/service";

import { ProdutoPreco } from "./crud.entity";
import { ProdutoPrecoUser } from "./crud-user.entity";

export class ProdutoPrecoService extends BaseCrudService{

    private produto: any;
    private unidadeCompra: any;

    constructor (
        @InjectRepository(ProdutoPreco) protected repo,
        @InjectRepository(ProdutoPrecoUser) protected repoUser,
        private produtoServ: ProdutoService,
        private unidadeServ: UnidadeMedidaService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: ProdutoPreco){

        model.produtoId = this.produto.id
        model.produtoName = this.produto.name

        model.ano = dto.ano
        model.mes = dto.mes

        model.unidadeMedidaCompraName = this.unidadeCompra.name
        model.unidadeMedidaCompraSigla = this.unidadeCompra.sigla
        model.unidadeMedidaCompraId = this.unidadeCompra.id

        model.precoCompra = dto.precoCompra
        model.dataMaximaPrecoCompra = dto.dataMaximaPrecoCompra

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        this.produto = await this.validateId(this.produtoServ, dto.produtoId, user)
        if (!this.produto){
            this.logger.error(`O Produto ${dto.produtoId} não foi encontrado`)
            return false
        }

        this.unidadeCompra = await this.validateId(this.unidadeServ, dto.unidadeMedidaCompraId, user)
        if (!this.unidadeCompra){
            this.logger.error(`A Unidade de Compra ${dto.unidadeMedidaCompraId} não foi encontrada`)
            return false
        }

        dto.name = this.produto.id +' - '+ dto.ano +' - '+ dto.mes
        return super.validate(dto, user)

    }

}