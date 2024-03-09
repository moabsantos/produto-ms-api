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
            create: "gerencial-empresa-parametros-dig",
            update: "gerencial-empresa-parametros-dig",
            delete: "gerencial-empresa-parametros-dig",
            get: "gerencial-empresa-parametros-cons"
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