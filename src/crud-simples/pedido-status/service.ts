import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoStatus } from "./crud.entity";
import { PedidoStatusUser } from "./crud-user.entity";

export class PedidoStatusService extends BaseCrudService{

    constructor (
        @InjectRepository(PedidoStatus) protected repo,
        @InjectRepository(PedidoStatusUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: PedidoStatus){

        model.flagPendente = dto.flagPendente
        model.flagAprovado = dto.flagAprovado
        model.flagEmProducao = dto.flagEmProducao
        model.flagEmTransito = dto.flagEmTransito
        model.flagFinalizado = dto.flagFinalizado

        model.cor = dto.cor
        
        return super.getDataFromDto(dto, user, model)
    }

}