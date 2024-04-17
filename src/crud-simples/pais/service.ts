import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { Pais } from "./crud.entity";
import { PaisUser } from "./crud-user.entity";

export class PaisService extends BaseCrudService{

    constructor (
        @InjectRepository(Pais) protected repo,
        @InjectRepository(PaisUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: Pais){

        model.sigla = dto.sigla
        model.codigoIBGE = dto.codigoIBGE
        
        return super.getDataFromDto(dto, user, model)
    }

}