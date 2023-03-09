import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoVenda } from "./crud.entity";
import { PedidoVendaUser } from "./crud-user.entity";
import { ClienteService } from "../cliente/service";
import { ClienteEstabelecimentoService } from "../cliente-estabelecimento/service";

export class PedidoVendaService extends BaseCrudService{

    cliente: any
    estabelecimento: any

    constructor (
        @InjectRepository(PedidoVenda) protected repo,
        @InjectRepository(PedidoVendaUser) protected repoUser,
        private clienteServ: ClienteService,
        private estabelecimentoServ: ClienteEstabelecimentoService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: PedidoVenda){
 
        model.clienteId = this.cliente.id
        model.clienteName = this.cliente.name
        model.clienteSigla = this.cliente.sigla
        
        model.clienteEstabelecimentoId = this.estabelecimento.id

        model.cnpj = this.estabelecimento.cnpj
        model.inscricaoEstadual = this.estabelecimento.inscricaoEstadual
        
        model.email = this.estabelecimento.email
        model.telefone = this.estabelecimento.telefone
        
        model.endereco = this.estabelecimento.endereco
        model.numero = this.estabelecimento.numero
        model.bairro = this.estabelecimento.bairro
        
        model.cidadeId = this.estabelecimento.cidadeId
        model.cidadeName = this.estabelecimento.cidadeName
        model.cidadeSigla = this.estabelecimento.cidadeSigla

        model.quantidadeItens = dto.quantidadeItens
        model.valorDesconto = dto.valorDesconto
        model.valorTotal = dto.valorTotal

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        this.cliente = await this.validateId(this.clienteServ, dto.clienteId, user)
        if (!this.cliente){
            this.logger.error(`O Cliente ${dto.clienteId} não foi encontrado`)
            return false
        }

        this.estabelecimento = await this.validateId(this.estabelecimentoServ, dto.estabelecimentoId, user)
        if (!this.estabelecimento){
            this.logger.error(`O Estabelecimento ${dto.estabelecimentoId} não foi encontrado`)
            return false
        }

        dto.name = `${dto.code} cli ${this.cliente.id} local ${this.estabelecimento.id}`
        return super.validate(dto, user)
    }

}