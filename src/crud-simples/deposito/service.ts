import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { Deposito } from "./crud.entity";
import { DepositoUser } from "./crud-user.entity";
import { EmpresaService } from "../empresa/service";
import { SetorService } from "../setor/service";

export class DepositoService extends BaseCrudService{

    constructor (
        @InjectRepository(Deposito) protected repo,
        @InjectRepository(DepositoUser) protected repoUser,
        private empresaServ: EmpresaService,
        private setorServ: SetorService)
    {
        super(repo, repoUser)

        this.setRole({
            
        })

        this.modelsRequired = [
            {fieldName: 'setor', service: this.setorServ, fields: ['name', 'sigla', 'id', 'code', 'description']},
            {fieldName: 'empresa', service: this.empresaServ, fields: ['name', 'sigla', 'id', 'code']}
        ]
    }

    getDataFromDto(dto: any, user: any, model: Deposito){

        model = this.getDataModelsFromDto(model)
        
        model.sigla = dto.sigla

        model.flagPrincipal = dto.flagPrincipal
        model.flagBaixaEstoque = dto.flagBaixaEstoque
        model.flagAjusteInventario = dto.flagAjusteInventario
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid) return false

        return super.validate(dto, user)
    }

}