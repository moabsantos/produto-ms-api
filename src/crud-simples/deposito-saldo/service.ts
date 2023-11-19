import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { DepositoSaldo } from "./crud.entity";
import { DepositoSaldoUser } from "./crud-user.entity";

const fieldsQuantidade = [
    'Total',
    'Fornecedor',
    'Pedida',
    'Faturada',
    'Recebida',
    'Disponivel',
    'Requisitada',
    'Separada',
    'Entregue',
    'Reservada',
    'Bloqueada',
    'Reprovada',
    'Aprovada'
]

export class DepositoSaldoService extends BaseCrudService{



    constructor (
        @InjectRepository(DepositoSaldo) protected repo,
        @InjectRepository(DepositoSaldoUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: DepositoSaldo){
        
        return super.getDataFromDto(dto, user, model)
    }

    async delete(req: any, user: any, id: number){

        const item = await this.get(req, user, id)

        if (!item?.data[0]) return -1

        let hasQuantityValid = false

        fieldsQuantidade.forEach(element => {
            if (element != 'Entregue') hasQuantityValid = hasQuantityValid || Number(item.data[0]['quantidade'+element]) != 0
        });

        if (Number(item?.data[0]['unidadeMedidaId']) == 0) hasQuantityValid = false

        if (!hasQuantityValid) await this.repo.delete(item.data[0].id)

        return {id}
    }

}