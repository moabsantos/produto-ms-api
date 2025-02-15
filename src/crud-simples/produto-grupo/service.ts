import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { ProdutoGrupo } from "./crud.entity";
import { ProdutoGrupoUser } from "./crud-user.entity";

export class ProdutoGrupoService extends BaseCrudService{

    constructor (
        @InjectRepository(ProdutoGrupo) protected repo,
        @InjectRepository(ProdutoGrupoUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: ProdutoGrupo){

        model.flagItemPedidoVenda = dto.flagItemPedidoVenda
        
        return super.getDataFromDto(dto, user, model)
    }

}