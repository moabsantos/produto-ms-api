import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { FormaPagamento } from "./crud.entity";
import { FormaPagamentoUser } from "./crud-user.entity";

export class FormaPagamentoService extends BaseCrudService{

    constructor (
        @InjectRepository(FormaPagamento) protected repo,
        @InjectRepository(FormaPagamentoUser) protected repoUser)
    {
        super(repo, repoUser)

        this.setRole({
            create: "fin-forma-pagamento-dig",
            update: "fin-forma-pagamento-dig",
            delete: "fin-forma-pagamento-dig",
            //get: "fin-forma-pagamento-get"
        })
    }

    getDataFromDto(dto: any, user: any, model: FormaPagamento){

        model.sigla = dto.sigla
        
        return super.getDataFromDto(dto, user, model)
    }

}