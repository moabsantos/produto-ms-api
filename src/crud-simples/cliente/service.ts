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

        this.setRole({
            create: "com-cliente-dig",
            update: "com-cliente-dig",
            delete: "com-cliente-dig",
            get: "com-cliente-cons"
        })
    }

    getDataFromDto(dto: any, user: any, model: Cliente){

        model = this.getModelFromInputs(model, dto, [
            'sigla', 'razaoSocial', 'flagPessoaJuridica', 'flagExtrangeiro', 'cpf'])
        
        return super.getDataFromDto(dto, user, model)
    }

}