import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";
import { GrupoAcessoModuloSistema } from "./crud.entity";

import { GrupoAcessoModuloSistemaUser } from "./crud-user.entity";
import { GrupoAcessoService } from "../grupo-acesso/service";
import { ModuloSistemaService } from "../modulo-sistema/service";

export class GrupoAcessoModuloSistemaService extends BaseCrudService{

    private grupo: any;
    private modulo: any;

    constructor (
        @InjectRepository(GrupoAcessoModuloSistema) protected repo,
        @InjectRepository(GrupoAcessoModuloSistemaUser) protected repoUser,
        private grupoServ: GrupoAcessoService,
        private moduloServ: ModuloSistemaService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: GrupoAcessoModuloSistema){

        model.grupoAcessoId = dto.grupoAcessoId
        model.grupoAcessoCode = this.grupo.code
        model.grupoAcessoName = this.grupo.name
        model.grupoAcessoDescription = this.grupo.description
        model.grupoAcessoSigla = this.grupo.sigla

        model.moduloSistemaId = this.modulo.id
        model.moduloSistemaCode = this.modulo.code
        model.moduloSistemaName = this.modulo.name
        model.moduloSistemaDescription = this.modulo.description

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!dto.grupoAcessoId){
            return false
        }

        if (!dto.moduloSistemaId){
            return false
        }

        this.grupo = await this.validateId(this.grupoServ, dto.grupoAcessoId, user)
        if (!this.grupo){
            this.logger.error(`O grupo ${dto.grupoAcessoId} não foi encontrado`)
            return false
        }

        this.modulo = await this.validateId(this.moduloServ, dto.moduloSistemaId, user)
        if (!this.modulo){
            this.logger.error(`O módulo ${dto.moduloSistemaId} não foi encontrado`)
            return false
        } 

        dto.code = 'RLM'+this.grupo.realmId+'GRP'+dto.grupoAcessoId+'MODUL'+dto.moduloSistemaId
        dto.name = dto.code
        return super.validate(dto, user)
    }

    async delete(req: any, user: any, id: number){

        const item = await this.get(req, user, id)

        await this.repo.delete(item.data[0].id)

        return {status: true, error: false, id: id, message: "Exclusão realizada"}
    }

}