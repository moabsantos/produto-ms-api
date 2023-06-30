import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";
import { PermissaoAcesso } from "./crud.entity";

import { PermissaoAcessoUser } from "./crud-user.entity";
import { BaseModel } from "src/_shared/base-model.entity";
import { dataCrud } from "./data";

export class PermissaoAcessoService extends BaseCrudService{

    constructor (
        @InjectRepository(PermissaoAcesso) protected repo,
        @InjectRepository(PermissaoAcessoUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: PermissaoAcesso){
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!dto.name){
            return false
        }

        return super.validate(dto, user)

    }

    async get(req: any, user: any, id?: number): Promise<any>{
        return {data:dataCrud}
    }

    async findByWhere(where: any): Promise<BaseModel[]>{

        if (where && where.id) return dataCrud.filter((data) => {return data.code == where.id})

        return null
    }

    async save(req: any, user: any, dto: any): Promise<number>{
        return null
    }

    async delete(req: any, user: any, id: number){
    }

}