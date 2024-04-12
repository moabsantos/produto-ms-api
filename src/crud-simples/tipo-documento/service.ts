import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { TipoDocumento } from "./crud.entity";
import { TipoDocumentoUser } from "./crud-user.entity";

export class TipoDocumentoService extends BaseCrudService{

    constructor (
        @InjectRepository(TipoDocumento) protected repo,
        @InjectRepository(TipoDocumentoUser) protected repoUser)
    {
        super(repo, repoUser)

        this.setRole({
            create: "fin-tipo-documento-dig",
            update: "fin-tipo-documento-dig",
            delete: "fin-tipo-documento-dig",
            //get: "fin-tipo-documento-get"
        })
    }

    getDataFromDto(dto: any, user: any, model: TipoDocumento){

        model = this.getModelFromInputs(model, dto, [
            'flagParcelaRecalculaContrato'])

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        return super.validate(dto, user)
    }

}