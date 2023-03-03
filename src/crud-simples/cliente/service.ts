import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { Cliente } from "./crud.entity";
import { ClienteUser } from "./crud-user.entity";

export class ClienteService extends BaseCrudService{

    constructor (
        @InjectRepository(Cliente) protected repo,
        @InjectRepository(ClienteUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: Cliente){

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