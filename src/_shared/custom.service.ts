import { Logger } from "@nestjs/common";
import { CrudRequest, GetManyDefaultResponse } from "@nestjsx/crud";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { DeepPartial, In, Repository } from "typeorm";
import { BaseModel } from "./base-model.entity";


export class CustomService<T> extends TypeOrmCrudService<BaseModel>{

    constructor (
        protected repo: Repository<BaseModel>,
        protected readonly logger = new Logger(CustomService.name))
    {
        super(repo)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!user){
            this.logger.error("login is requerid")
            return
        }

        if (!user.userId){
            this.logger.error("id do login is requerid")
            return
        }

        if (!user.realmId){
            this.logger.error("login in Realm is requerid")
            return
        }

        return true
        
    }

    async foundDuplicated(dto: any, user: any): Promise<boolean>{
        console.log('dto custom')
        return false
    }

    getDataFromDto(dto: any, user: any, model: BaseModel){
        return model
    }

    async afterSave(dto: any, user: any, model: BaseModel){
        return model
    }

    getIdsAutorizados(w: any): Promise<BaseModel[]> {
        return this.repo.find({where:w})
    }

    async get(req: CrudRequest, user: any, id?: number): Promise<GetManyDefaultResponse<BaseModel> | BaseModel[]>{

        let w: any;
        w = {userId: user.userId}

        if (id){
            w = {...w, originId: id}
        }

        let userModel = await this.getIdsAutorizados(w)

        if (!userModel){
            return
        }

        if (userModel.length > 0 && id)
            return this.repo.find({where: {id: id}})

        let listIds = userModel.map((value) => value['originId'])
        
        req.options.query.filter = {
            id:{
                $in:[0]
            }
        }

        if (listIds.length > 0)
            req.options.query.filter = {
                id:{
                    $in:listIds
                }
            }
        
        let modelsFound = await this.getMany(req)

        return modelsFound
    }


    async findByWhere(where: any){
        return this.repo.find({where: where})
    }

    async save(req: CrudRequest, user: any, dto: any){
        
        let modelRepoFound
        if(dto.id){

            modelRepoFound  = await this.get(req, user, dto.id)
            console.log(`id ${dto.id} user ${user}`)
            console.log(modelRepoFound)

            if (modelRepoFound.length > 1){
                this.logger.error("found duplicated on save")
                this.logger.error(modelRepoFound)
                return 
            }

            if (!modelRepoFound){
                return
            }

            if (!modelRepoFound[0]){
                return
            }
        }

        const validated = await this.validate(dto, user)
        if (!validated){
            this.logger.error("validation basic")
            return
        }

        
        if (await this.foundDuplicated(dto, user)){
            this.logger.error("found duplicated")
            return
        }

        let modelRepo: BaseModel
        
        if(dto.id){

            modelRepo = modelRepoFound[0]
            modelRepo.updated_by = user.userId
            modelRepo.updated_at = new Date()

        }else{
            modelRepo = new BaseModel()
            modelRepo.created_by = user.userId
            modelRepo.created_at = new Date()
        }
        
        
        modelRepo = this.getDataFromDto(dto, user, modelRepo)
        modelRepo = await this.repo.save(modelRepo)

        this.afterSave(dto, user, modelRepo)

        return modelRepo.id

    }


    async delete(req: CrudRequest, user: any, id: number){

        if (!user){
            return
        }

        if (!user.userId){
            return
        }

        if (!id){
            return
        }

        let modelFound = await this.get(req, user, id)

        if (!modelFound){
            return
        }

        if (!modelFound[0]){
            return
        }

        modelFound[0].deleted_at = new Date()
        modelFound[0].deleted_by = user.userId

        await this.repo.save(modelFound[0])
        
        return modelFound[0].id
    }
}