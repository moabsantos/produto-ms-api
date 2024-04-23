import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoTipo } from "./crud.entity";
import { PedidoTipoUser } from "./crud-user.entity";

export class PedidoTipoService extends BaseCrudService{

    constructor (
        @InjectRepository(PedidoTipo) protected repo,
        @InjectRepository(PedidoTipoUser) protected repoUser)
    {
        super(repo, repoUser)

        this.setRole({
            create: "geral-pedido-tipo-dig",
            update: "geral-pedido-tipo-dig",
            delete: "geral-pedido-tipo-dig",
            //get: "geral-pedido-tipo-get",
        })

        this.modelsRequired = []
    }

    getDataFromDto(dto: any, user: any, model: PedidoTipo){

        model = this.getModelFromInputs(model, dto, ['sigla'])

        model = this.getDataModelsFromDto(model)
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const checkFields = this.validateFieldsRequireds([{name: "sigla"}], dto)
        if (!checkFields || !checkFields.status) return checkFields

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        return super.validate(dto, user)
    }

}