import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";
import { Produto } from "./crud.entity";

import { ProdutoUser } from "./crud-user.entity";
import { UnidadeMedidaService } from "../unidade-medida/service";

export class ProdutoService extends BaseCrudService{

    private unidadeMedida: any;
    private unidadeMedidaCompra: any;

    constructor (
        @InjectRepository(Produto) protected repo,
        @InjectRepository(ProdutoUser) protected repoUser,
        private unidadeServ: UnidadeMedidaService )
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: Produto){

        model.unidadeMedidaName = this.unidadeMedida.name
        model.unidadeMedidaSigla = this.unidadeMedida.sigla
        model.unidadeMedidaId = dto.unidadeMedidaId

        model.unidadeMedidaCompraName = this.unidadeMedidaCompra.name
        model.unidadeMedidaCompraSigla = this.unidadeMedidaCompra.sigla
        model.unidadeMedidaCompraId = dto.unidadeMedidaCompraId

        model.flagServico = 0
        if (dto.flagServico > 0)
            model.flagServico = 1
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        const unidMedida = await this.unidadeServ.findByWhere({
            id: dto.unidadeMedidaId,
            realmId: user.realmId
        })

        if (unidMedida.length == 0){
            this.logger.error(`A unidade de medida ${dto.unidadeMedidaId} não foi encontrada`)
            return false
        }
        this.unidadeMedida = unidMedida[0]

        if (dto.unidadeMedidaCompraId){
            this.unidadeMedidaCompra = await this.validateId(this.unidadeServ, dto.unidadeMedidaCompraId, user)
            if (!this.unidadeMedidaCompra){
                this.logger.error(`A Unidade de Compra ${dto.unidadeMedidaCompraId} não foi encontrada`)
                return false
            }
        }

        if (!dto.name){
            return false
        }

        return super.validate(dto, user)

    }

}