
import { BaseModelCrud } from './base-model-crud.entity';
import { CustomService } from "./custom.service";
import { BaseModel } from "./base-model.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseModelUser } from './base-model-user';


export class BaseCrudService extends CustomService<BaseModelCrud>{

    constructor (
        @InjectRepository(BaseModelCrud) protected repo,
        @InjectRepository(BaseModelUser) protected repoUser)
    {
        super(repo)
    }

    async validate(dto, user: number): Promise<boolean>{

        if (!dto.id && !dto.name){
            return false
        }

        return super.validate(dto, user)
    }

    async foundDuplicated(dto: any, user: any): Promise<boolean> {

        if (!dto.name){
            return false
        }

        let modelRepo = await this.repo.findOne({where:{name:dto.name}})

        if(modelRepo && (!dto.id || dto.id != modelRepo.id)){

            return true
        }

        return false
    }

    getDataFromDto(dto: any, user: any, model: BaseModelCrud){

        model.name = dto.name
        model.description = dto.description
        model.idImage = dto.idImage

        model.realmId = user.realmId
        return model
    }

    getIdsAutorizados(w: any): Promise<BaseModelUser[]> {
        return this.repoUser.find({where:w})
    }

    async afterSave(dto: any, user: any, model: BaseModel) {

        if (!dto.id && user.userId){
            this.repoUser.save({
                originId:model.id, 
                userId: user.userId, 
                isAdmin: true,
                created_at: new Date(),
                created_by: user.userId
            })
        }
        
        return model
    }

}