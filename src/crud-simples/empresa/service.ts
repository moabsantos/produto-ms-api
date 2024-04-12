import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { Empresa } from "./crud.entity";
import { EmpresaUser } from "./crud-user.entity";

export class EmpresaService extends BaseCrudService{

    constructor (
        @InjectRepository(Empresa) protected repo,
        @InjectRepository(EmpresaUser) protected repoUser)
    {
        super(repo, repoUser)

        this.setRole({
            create: "gestao-empresa-dig",
            update: "gestao-empresa-dig",
            delete: "gestao-empresa-dig",
            //get: "gestao-empresa-get"
        })

    }

    getDataFromDto(dto: any, user: any, model: Empresa){

        model.sigla = dto.sigla
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!dto.name){
            return false
        }

        return super.validate(dto, user)

    }

}