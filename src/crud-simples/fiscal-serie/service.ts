import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { FiscalSerie } from "./crud.entity";
import { FiscalSerieUser } from "./crud-user.entity";

export class FiscalSerieService extends BaseCrudService{

    constructor (
        @InjectRepository(FiscalSerie) protected repo,
        @InjectRepository(FiscalSerieUser) protected repoUser)
    {
        super(repo, repoUser)

        this.setRole({
            create: "fiscal-serie-dig",
            update: "fiscal-serie-dig",
            delete: "fiscal-serie-dig",
            //get: "fiscal-serie-cons",
        })

        this.modelsRequired = []
    }

    getDataFromDto(dto: any, user: any, model: FiscalSerie){

        model = this.getModelFromInputs(model, dto, [
            'sigla', 'codModelo', 'serie', 'proximoNumero'])

        model = this.getDataModelsFromDto(model)
        
        return super.getDataFromDto(dto, user, model)
    }

    getProximoNumero(req: any, dto: any, user: any){
        let numero = this.getById(req, user, {id: dto.id})
        this.updateRepoId(req, user, {id: dto.id, proximoNumero: Number(numero) +1})
        return numero
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const checkFields = this.validateFieldsRequireds([
            {name: "sigla"}, {name: "codModelo"}, {name: "serie"}, {name: "proximoNumero"}], dto)
        if (!checkFields || !checkFields.status) return checkFields

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        return super.validate(dto, user)
    }

}