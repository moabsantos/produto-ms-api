import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { RequisicaoAlmoxarifadoItem } from "./crud.entity";
import { RequisicaoAlmoxarifadoItemUser } from "./crud-user.entity";
import { ProdutoService } from "../produto/service";
import { UnidadeMedidaService } from "../unidade-medida/service";
import { SetorService } from "../setor/service";

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
        private setorServ: SetorService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: RequisicaoAlmoxarifadoItem){
 
        model.requisicaoAlmoxarifadoId = dto.requisicaoAlmoxarifadoId

        model.itemDescription = this.item.description
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

}