import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";
import { PermissaoAcesso } from "./crud.entity";

import { PermissaoAcessoUser } from "./crud-user.entity";
import { BaseModel } from "src/_shared/base-model.entity";

export class PermissaoAcessoService extends BaseCrudService{

    constructor (
        @InjectRepository(PermissaoAcesso) protected repo,
        @InjectRepository(PermissaoAcessoUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: PermissaoAcesso){

        model.sigla = dto.sigla
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!user){
            this.logger.error("login is requerid")
            return
        }

        if (!dto.name){
            return false
        }

        return true

    }

    async get(req: any, user: any, id?: number): Promise<any>{
    }

    async findByWhere(where: any): Promise<BaseModel[]>{
        return null
    }

    async save(req: any, user: any, dto: any): Promise<number>{
        return null
    }

    async delete(req: any, user: any, id: number){
    }

}