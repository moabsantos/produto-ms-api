import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";
import { ModuloSistema } from "./crud.entity";

import { ModuloSistemaUser } from "./crud-user.entity";
import { BaseModel } from "src/_shared/base-model.entity";
import { dataCrud } from "./data";

export class ModuloSistemaService extends BaseCrudService{

    constructor (
        @InjectRepository(ModuloSistema) protected repo,
        @InjectRepository(ModuloSistemaUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: ModuloSistema){
        
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

    async save(req: any, user: any, dto: any){
        return null
    }

    async delete(req: any, user: any, id: number){
    }

}