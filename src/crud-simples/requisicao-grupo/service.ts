import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { RequisicaoGrupo } from "./crud.entity";
import { RequisicaoGrupoUser } from "./crud-user.entity";

export class RequisicaoGrupoService extends BaseCrudService{

    constructor (
        @InjectRepository(RequisicaoGrupo) protected repo,
        @InjectRepository(RequisicaoGrupoUser) protected repoUser)
    {
        super(repo, repoUser)

        this.setRole({
            create: "sup-requisicao-grupo-dig",
            update: "sup-requisicao-grupo-dig",
            delete: "sup-requisicao-grupo-dig",
            get: null
        })
    }

    getDataFromDto(dto: any, user: any, model: RequisicaoGrupo){

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        return super.validate(dto, user)
    }

}