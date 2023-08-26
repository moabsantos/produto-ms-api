import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { Representante } from "./crud.entity";
import { RepresentanteUser } from "./crud-user.entity";

import { EmpresaService } from "../empresa/service";

export class RepresentanteService extends BaseCrudService{

    constructor (
        @InjectRepository(Representante) protected repo,
        @InjectRepository(RepresentanteUser) protected repoUser,
        private empresaServ: EmpresaService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "com-representante-dig",
            update: "com-representante-dig",
            delete: "com-representante-dig",
            get: "com-representante-dig"
        })

        this.modelsRequired = [
            {fieldName: 'empresa', service: this.empresaServ, fields: ['name', 'sigla', 'id', 'code']},
        ]
    }

    getDataFromDto(dto: any, user: any, model: Representante){

        model = this.getDataModelsFromDto(model)
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid) return false

        return super.validate(dto, user)
    }

}