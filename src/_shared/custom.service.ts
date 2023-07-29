import { Logger } from "@nestjs/common";
import { CrudRequest } from "@nestjsx/crud";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { BaseModel } from "./base-model.entity";


export class CustomService<T> extends TypeOrmCrudService<BaseModel>{

    private roleService: any = {}

    constructor (
        protected repo: Repository<BaseModel>,
        protected readonly logger = new Logger(CustomService.name))
    {
        super(repo)
    }

    setRole(role: any){
        this.roleService = role
    }

    valorValido(valor: any){
        if (valor == undefined)
            return false

        if (valor == null)
            return false

        return true
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

        if (!dto.id) return user.hasPermissao(this.roleService.create)
        if (dto.id) return user.hasPermissao(this.roleService.update)

        return true
        
    }

    async foundDuplicated(dto: any, user: any): Promise<boolean>{
        console.log('dto custom')
        return false
    }

    getDataFromDto(dto: any, user: any, model: BaseModel){
        return model
    }

    async afterSave(req: any, dto: any, user: any, model: BaseModel){
        return model
    }

    getIdsAutorizados(w: any): Promise<BaseModel[]> {
  
        return this.repo.find({where:w})
    }

    async get(req: CrudRequest, user: any, id?: number): Promise<any>{

        const userHasPermissao = await user.hasPermissao(this.roleService.get)
  
        if (!userHasPermissao){
            return {
                msgGeral: "Usuário "+ user.id +" não autorizado ("+this.roleService.get+") a esta busca no contexto "+ user.realmId,
                data: []
            }
        }

        let w: any;
        w = {userId: user.userId}

        if (id){
            w = {...w, originId: id}
        }

        let userModel = await this.getIdsAutorizados(w)

        if (!userModel){
            return {
                msgGeral: "Não há dados autorizados para visualização",
                data: []
            }
        }

        if (userModel.length > 0 && this.valorValido(id)){
            
            const data = await this.repo.find({where:{id:id}})

            if (data && data[0]['realmId'] != user.realmId){
                return {
                    msgGeral: "Não há dados autorizados para visualização",
                    data: []
                }
            }
            return {
                msgGeral: `Resultado para o id ${id}`,
                data: data
            }
        }


        req.options.query.filter = {
            realmId:{
                $eq:user.realmId
            }
        }
        
        if (req.parsed.search['$or']) req.parsed.search['$or'] = null
        let filtroRealm = false

        req.parsed.search['$and'].forEach(element => {
            if (!filtroRealm) filtroRealm = element && element["realmId"] && JSON.stringify(element["realmId"]) == JSON.stringify({$eq:user.realmId})
        });

        if (!filtroRealm || !user.realmId) return {
            msgGeral: "Filtro sem Relm",
            data: []
        }

        let modelsFound = await this.getMany(req)

        return {
            msgGeral: "Resultado para filtro sem o id único",
            data: modelsFound
        }
    }


    async findByWhere(where: any){
        if (where){
            return this.repo.find({where: where})
        }
        return this.repo.find()
    }

    async save(req: CrudRequest, user: any, dto: any){
        
        let modelRepoFound
        if(dto.id){

            const resBusca  = await this.get(req, user, dto.id)
            modelRepoFound  = resBusca.data

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

        this.afterSave(req, dto, user, modelRepo)

        const tipoEvento = dto.id ? "atualizado" : "incluído"

        return { success: {
            id: modelRepo.id,
            messages: [
                `${this.constructor.name}:Id ${modelRepo.id} ${tipoEvento} com sucesso.`
            ]
        }} 

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