import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { Fornecedor } from "./crud.entity";
import { FornecedorUser } from "./crud-user.entity";

export class FornecedorService extends BaseCrudService{

    constructor (
        @InjectRepository(Fornecedor) protected repo,
        @InjectRepository(FornecedorUser) protected repoUser)
    {
        super(repo, repoUser)

        this.setRole({
            create: "supr-fornecedor-dig",
            update: "supr-fornecedor-dig",
            delete: "supr-fornecedor-dig",
            // get: "supr-fornecedor-get"
        })
    }

    getDataFromDto(dto: any, user: any, model: Fornecedor){

        model.sigla = dto.sigla
        
        return super.getDataFromDto(dto, user, model)
    }

}