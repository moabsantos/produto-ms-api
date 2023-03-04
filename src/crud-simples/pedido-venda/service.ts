import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoVenda } from "./crud.entity";
import { PedidoVendaUser } from "./crud-user.entity";

export class PedidoVendaService extends BaseCrudService{

    constructor (
        @InjectRepository(PedidoVenda) protected repo,
        @InjectRepository(PedidoVendaUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: PedidoVenda){
        
        return super.getDataFromDto(dto, user, model)
    }

}