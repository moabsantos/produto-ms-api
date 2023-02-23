import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";
import { UnidadeMedida } from "./crud.entity";

import { UnidadeMedidaUser } from "./crud-user.entity";

export class UnidadeMedidaService extends BaseCrudService{

    constructor (
        @InjectRepository(UnidadeMedida) protected repo,
        @InjectRepository(UnidadeMedidaUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: UnidadeMedida){

        model.sigla = dto.sigla
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!user){
            this.logger.error("login is requerid")
            return
        }

        if (!dto.name){
            return false
        }

        return true

    }

}