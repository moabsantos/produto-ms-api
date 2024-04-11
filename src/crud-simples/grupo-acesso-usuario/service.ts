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

    async validate(dto: any, user: any): Promise<any>{

        if (!dto.grupoAcessoId){
            return this.getMessage(null, user, this, {status: false, error: false, message: `Validate: id grupo requerido [${dto.grupoAcessoId}]`})
        }

        if (!dto.userEmail){
            return this.getMessage(null, user, this, {status: false, error: false, message: `Validate: Email requerido [${dto.userEmail}]`})
        }

        if (!dto.empresaId){
            return this.getMessage(null, user, this, {status: false, error: false, message: `Validate: id empresa requerido [${dto.empresaId}]`})
        }

        this.grupo = await this.validateId(this.grupoServ, dto.grupoAcessoId, user)
        if (!this.grupo){
            return this.getMessage(null, user, this, {status: false, error: false, message: `Validate: id grupo invalido [${dto.grupoAcessoId}]`})
        }

        this.empresa = await this.validateId(this.empresaServ, dto.empresaId, user)
        if (!this.empresa){
            return this.getMessage(null, user, this, {status: false, error: false, message: `Validate: id empresa invalido [${dto.empresaId}]`})
        }

        this.usuario = await this.usuarioServ.findByWhere({email: dto.userEmail})
        if (this.usuario.length != 1) {
            return this.getMessage(null, user, this, {status: false, error: false, message: `Validate: email invalido [${dto.userEmail}]`})
        }

        this.usuario = this.usuario[0]
        dto.code = 'RLM'+this.grupo.realmId + 'GRP' + dto.grupoAcessoId + 'USU' + this.usuario.id
        dto.name = dto.code
        
        return super.validate(dto, user)
    }

}