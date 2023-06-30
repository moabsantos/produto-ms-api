import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";
import { GrupoAcessoUsuario } from "./crud.entity";

import { GrupoAcessoUsuarioUser } from "./crud-user.entity";
import { GrupoAcessoService } from "../grupo-acesso/service";
import { UserService } from "src/_user/user.service";
import { EmpresaService } from "../empresa/service";

export class GrupoAcessoUsuarioService extends BaseCrudService{

    private grupo: any;
    private usuario: any;
    private empresa: any;

    constructor (
        @InjectRepository(GrupoAcessoUsuario) protected repo,
        @InjectRepository(GrupoAcessoUsuarioUser) protected repoUser,
        private grupoServ: GrupoAcessoService,
        private usuarioServ: UserService,
        private empresaServ: EmpresaService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: GrupoAcessoUsuario){

        model.grupoAcessoId = dto.grupoAcessoId
        model.grupoAcessoCode = this.grupo.code
        model.grupoAcessoName = this.grupo.name
        model.grupoAcessoDescription = this.grupo.description
        model.grupoAcessoSigla = this.grupo.sigla

        model.userId = this.usuario.id
        model.userEmail = this.usuario.email
        model.userName = this.usuario.name

        model.empresaId = this.empresa.id
        model.empresaCode = this.empresa.code
        model.empresaName = this.empresa.name
        model.empresaSigla = this.empresa.sigla
    
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!dto.grupoAcessoId){
            return false
        }

        if (!dto.userEmail){
            return false
        }

        if (!dto.empresaId){
            return false
        }

        this.grupo = await this.validateId(this.grupoServ, dto.grupoAcessoId, user)
        if (!this.grupo){
            this.logger.error(`O grupo ${dto.grupoAcessoId} não foi encontrado`)
            return false
        }

        this.empresa = await this.validateId(this.empresaServ, dto.empresaId, user)
        if (!this.grupo){
            this.logger.error(`A empresa ${dto.empresaId} não foi encontrada`)
            return false
        }

        this.usuario = await this.usuarioServ.findByWhere({email: dto.userEmail})

        if (this.usuario.length != 1) {
            this.logger.error('Email não é válido. Encontrado: '+ this.usuario.length)
            return false
        }

        this.usuario = this.usuario[0]

        dto.code = 'RLM'+this.grupo.realmId + 'GRP' + dto.grupoAcessoId + 'USU' + this.usuario.id
        dto.name = dto.code
        
        return super.validate(dto, user)
    }

    async delete(req: any, user: any, id: number){

        const item = await this.get(req, user, id)

        const deleted = await this.repo.delete(item.data[0].id)

        return {id}
    }

}