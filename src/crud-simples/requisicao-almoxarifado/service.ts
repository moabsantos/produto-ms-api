import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { RequisicaoAlmoxarifado } from "./crud.entity";
import { RequisicaoAlmoxarifadoUser } from "./crud-user.entity";
import { EmpresaService } from "../empresa/service";

export class RequisicaoAlmoxarifadoService extends BaseCrudService{

    private empresa: any;
    
    constructor (
        @InjectRepository(RequisicaoAlmoxarifado) protected repo,
        @InjectRepository(RequisicaoAlmoxarifadoUser) protected repoUser,
        private empresaServ: EmpresaService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: RequisicaoAlmoxarifado){
 
        model.dataSolicitacao = dto.dataSolicitacao

        model.empresaName = this.empresa.name
        model.empresaSigla = this.empresa.sigla
        model.empresaId = dto.empresaId

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (dto.empresaId){
            this.empresa = await this.validateId(this.empresaServ, dto.empresaId, user)
            if (!this.empresa){
                this.logger.error(`A empresa ${dto.empresaId} não foi encontrada`)
                return false
            }
        }

        return super.validate(dto, user)
    }

}