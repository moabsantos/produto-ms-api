import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { Deposito } from "./crud.entity";
import { DepositoUser } from "./crud-user.entity";
import { EmpresaService } from "../empresa/service";

export class DepositoService extends BaseCrudService{

    private empresa: any;

    constructor (
        @InjectRepository(Deposito) protected repo,
        @InjectRepository(DepositoUser) protected repoUser,
        private empresaServ: EmpresaService)
    {
        super(repo, repoUser)

        this.setRole({
            
        })
    }

    getDataFromDto(dto: any, user: any, model: Deposito){

        model.flagPrincipal = dto.flagPrincipal
        model.flagBaixaEstoque = dto.flagBaixaEstoque

        model.empresaName = this.empresa.name
        model.empresaSigla = this.empresa.sigla
        model.empresaCode = this.empresa.code
        model.empresaId = dto.empresaId
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        this.empresa = await this.validateId(this.empresaServ, dto.empresaId, user)
        if (!this.empresa){
            this.logger.error(`A empresa ${dto.empresaId} não foi encontrada`)
            return false
        }

        return super.validate(dto, user)
    }

}