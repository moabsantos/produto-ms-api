
import { BaseModelCrud } from './base-model-crud.entity';
import { CustomService } from "./custom.service";
import { BaseModel } from "./base-model.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseModelUser } from './base-model-user';


export class BaseCrudService extends CustomService<BaseModelCrud>{

    protected modelsRequired = null

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

    async validateId(service: BaseCrudService, id: any, user: any): Promise<any>{

        if (!id) return false

        const listService = await service.findByWhere({
            id: id,
            realmId: user.realmId
        })

        if (listService.length == 0){
            return false
        }

        return listService[0]
    }

    async foundDuplicated(dto: any, user: any): Promise<boolean> {

        if (!dto.name){
            return false
        }

        let modelRepo = await this.repo.findOne({where:{name:dto.name, realmId:user.realmId}})
        
        if(modelRepo && (!dto.id || dto.id != modelRepo.id)){

            return true
        }

        return false
    }

    async validateModelsRequired(dto: any, user: any): Promise<boolean>{

        if (!this.modelsRequired) return false

        this.modelsRequired.forEach(async d => {

            d.objeto = await this.validateId(d.service, dto[d.fieldName + 'Id'], user)
            if (!d.objeto){
                this.logger.error(`O atributo ${d.fieldName}Id informado não é válido!`)
                return false
            }

        });

        return true
    }

    getDataModelsFromDto(model){

        if (!this.modelsRequired) return model

        this.modelsRequired.forEach(d => {
            model = this.getModelfromDto(model, d.objeto, d.fiedlName, '', d.fields) 
        });

        return model
    }

    getModelfromDto(model, dto, prefixFieldDestination, prefixFieldOrigin, fields){

        if (!fields || !dto || !prefixFieldDestination || !prefixFieldOrigin) return model

        fields.forEach(f => {
            model[prefixFieldDestination + f] = dto[prefixFieldOrigin + f]
        });

        return model
    }

    getDataFromDto(dto: any, user: any, model: BaseModelCrud): BaseModelCrud{

        model.code = dto.code
        model.name = dto.name
        model.description = dto.description
        model.idImage = dto.idImage

        model.realmId = user.realmId
        return model
    }

    getIdsAutorizados(w: any): Promise<BaseModelUser[]> {

        return this.repoUser.find({where:w})
    }

    async afterSave(req: any, dto: any, user: any, model: BaseModel) {

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