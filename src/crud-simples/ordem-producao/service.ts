import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { OrdemProducao } from "./crud.entity";
import { OrdemProducaoUser } from "./crud-user.entity";
import { ClienteService } from "../cliente/service";
import { PedidoVendaService } from "../pedido-venda/service";

export class OrdemProducaoService extends BaseCrudService{

    cliente: any
    pedido: any

    constructor (
        @InjectRepository(OrdemProducao) protected repo,
        @InjectRepository(OrdemProducaoUser) protected repoUser,
        private pedidoServ: PedidoVendaService,
        private clienteServ: ClienteService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: OrdemProducao){
 
        model.clienteId = this.cliente.id
        model.clienteName = this.cliente.name
        model.clienteSigla = this.cliente.sigla

        model.quantidadeItens = dto.quantidadeItens

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        this.pedido = await this.validateId(this.pedidoServ, dto.pedidoVendaId, user)
        if (!this.pedido){
            this.logger.error(`O Pedido ${dto.pedidoVendaId} não foi encontrado`)
            return false
        }

        this.cliente = await this.validateId(this.clienteServ, dto.clienteId, user)
        if (!this.cliente){
            this.logger.error(`O Cliente ${dto.clienteId} não foi encontrado`)
            return false
        }

        dto.name = `${dto.pedidoVendaId} ${dto.code} cli ${this.cliente.id}`
        return super.validate(dto, user)
    }

}