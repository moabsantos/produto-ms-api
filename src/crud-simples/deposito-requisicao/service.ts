import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { DepositoRequisicao } from "./crud.entity";
import { DepositoRequisicaoUser } from "./crud-user.entity";

export class DepositoRequisicaoService extends BaseCrudService{

    constructor (
        @InjectRepository(DepositoRequisicao) protected repo,
        @InjectRepository(DepositoRequisicaoUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: DepositoRequisicao){
        
        model.code = dto.code
        model.name = dto.name
        
        model.empresaId = dto.empresaId
        model.empresaName = dto.empresaName
        model.empresaSigla = dto.empresaSigla
    
        model.itemId = dto.itemId
        model.itemName = dto.itemName
        model.itemSigla = dto.itemSigla
        model.itemDescription = dto.itemDescription
    
        model.unidadeMedidaId = dto.unidadeMedidaId
        model.unidadeMedidaName = dto.unidadeMedidaName
        model.unidadeMedidaSigla = dto.unidadeMedidaSigla
    
        model.loteId = dto.loteId
        model.loteCodigo = dto.loteCodigo
    
        model.setorId = dto.setorId
        model.setorName = dto.setorName
        model.setorSigla = dto.setorSigla
    
        model.depositoIdOrigem = dto.depositoIdOrigem
        model.depositoNameOrigem = dto.depositoNameOrigem
        model.depositoSiglaOrigem = dto.depositoSiglaOrigem
    
        model.depositoIdDestino = dto.depositoIdDestino
        model.depositoNameDestino = dto.depositoNameDestino
        model.depositoSiglaDestino = dto.depositoSiglaDestino
        

        const qtdsName = [
            'Disponivel', 'Requisitada', 'Separada', 'Entregue', 'Reservada', 'Bloqueada', 'Aprovada', 'Reprovada'
        ]
        qtdsName.forEach(element => {
            model['quantidade'+ element + 'Origem'] = dto['quantidade'+ element + 'Origem'] ? dto['quantidade'+ element + 'Origem'] : 0
            model['quantidade'+ element + 'Destino'] = dto['quantidade'+ element + 'Destino'] ? dto['quantidade'+ element + 'Destino'] : 0
        });

        model.origemRequisicaoName = dto.origemRequisicaoName
        model.origemRequisicaoId = dto.origemRequisicaoId

        return super.getDataFromDto(dto, user, model)
    }

}