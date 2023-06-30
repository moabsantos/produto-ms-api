import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";
import { GrupoAcessoPermissao } from "./crud.entity";

import { GrupoAcessoPermissaoUser } from "./crud-user.entity";
import { GrupoAcessoService } from "../grupo-acesso/service";
import { PermissaoAcessoService } from "../permissao-acesso/service";

export class GrupoAcessoPermissaoService extends BaseCrudService{

    private grupo: any;
    private permissao: any;

    constructor (
        @InjectRepository(GrupoAcessoPermissao) protected repo,
        @InjectRepository(GrupoAcessoPermissaoUser) protected repoUser,
        private grupoServ: GrupoAcessoService,
        private permissaoServ: PermissaoAcessoService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: GrupoAcessoPermissao){

        model.grupoAcessoId = dto.grupoAcessoId
        model.grupoAcessoCode = this.grupo.code
        model.grupoAcessoName = this.grupo.name
        model.grupoAcessoDescription = this.grupo.description
        model.grupoAcessoSigla = this.grupo.sigla

        model.permissaoAcessoId = this.permissao.id
        model.permissaoAcessoCode = this.permissao.code
        model.permissaoAcessoName = this.permissao.name
        model.permissaoAcessoDescription = this.permissao.description

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!dto.grupoAcessoId){
            return false
        }

        if (!dto.permissaoAcessoId){
            return false
        }

        this.grupo = await this.validateId(this.grupoServ, dto.grupoAcessoId, user)
        if (!this.grupo){
            this.logger.error(`O grupo ${dto.grupoAcessoId} não foi encontrado`)
            return false
        }

        this.permissao = await this.validateId(this.permissaoServ, dto.permissaoAcessoId, user)
        if (!this.permissao){
            this.logger.error(`A permissão ${dto.permissaoAcessoId} não foi encontrada`)
            return false
        } 

        dto.code = 'RLM'+this.grupo.realmId+'GRP'+dto.grupoAcessoId+'PERM'+dto.permissaoAcessoId
        dto.name = dto.code
        return super.validate(dto, user)
    }

    async delete(req: any, user: any, id: number){

        const item = await this.get(req, user, id)

        const deleted = await this.repo.delete(item.data[0].id)

        return {id}
    }

}