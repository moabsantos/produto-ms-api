
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

    async getById(req: any, user: any, dto: any): Promise<any>{

        const resId = await this.repo.find({where:{id: dto.id, realmId: user.realmId}})

        if (!resId || resId.length != 1) return

        return resId[0]
    }

    async getUnico(req: any, user: any, dto: any): Promise<any>{

        const resId = await this.repo.find({where:{...dto, realmId: user.realmId}})

        if (!resId || resId.length != 1) return

        return resId[0]
    }

    async getLista(req: any, user: any, dto: any): Promise<any>{

        const res = await this.repo.find({where:{...dto, realmId: user.realmId}})

        return res
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

        if (!dto.name) return false

        let modelRepo = await this.repo.findOne({where:{name:dto.name, realmId: user.realmId}})
        
        if(modelRepo && (!dto.id || dto.id != modelRepo.id)){

            return true
        }

        return false
    }

    async validateFieldsRequireds(roler, dto): Promise<boolean>{

        if (!roler) return true

        roler.forEach(f => {
            if (!dto[f.name]) return false
        });

        return true
    }

    async validateModelsRequired(dto: any, user: any): Promise<boolean>{

        if (!this.modelsRequired) return false

        if (this.modelsRequired.length == 0) return true

        for (let index = 0; index < this.modelsRequired.length; index++) {
            
            const d = this.modelsRequired[index];

            this[d.fieldName] = {
                id: null, name: null
            }

            const idFunc = d.getId ? d.getId() : 0

            const idDto = dto[d.fieldName + 'Id'] ? dto[d.fieldName + 'Id'] : idFunc

            if (d.optional && (!idDto || idDto == "")) continue
            
            d.objeto = await this.validateId(d.service, idDto, user)
            if (!d.objeto){
                this.logger.error(`O id ${idDto} informado no atributo ${d.fieldName}Id não é válido!`)
                return false
            }

            this[d.fieldName] = d.objeto

        }

        return true
    }

    getModelFromInputs(model, dto, inputs){

        inputs.forEach(f => {
            model = dto[f] 
        });

        return model
    }

    getDataModelsFromDto(model){

        if (!this.modelsRequired) return model
        
        this.modelsRequired.forEach(d => {
            model = this.getModelfromDto(model, d.objeto, d.fieldName, '', d.fields) 
        });

        return model
    }

    getModelfromDto(model = null, dto = null, prefixFieldDestination = '', prefixFieldOrigin = '', fields = []){

        if (!fields || !prefixFieldDestination) return model

        fields.forEach(f => {
            const fieldDestino = prefixFieldDestination + f.charAt(0).toUpperCase() + f.slice(1)

            model[fieldDestino] = dto && dto[prefixFieldOrigin + f] ? dto[prefixFieldOrigin + f] : null
        });

        return model
    }

    getDataFromDto(dto: any, user: any, model: BaseModelCrud): BaseModelCrud{

        model.code = dto.code
        model.name = dto.name
        model.description = dto.description
        model.idImage = dto.idImage
        model.sigla = dto.sigla ? dto.sigla : null

        model.realmId = user.realmId
        return model
    }

    getIdsAutorizados(w: any): Promise<BaseModelUser[]> {

        if (!w) return Promise.resolve([])

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

    async selecaoItem(req: any, user: any, id: number): Promise<any>{

        if (!id) return {id: null, idUserSelecao: null}
        
        const itens = await this.repo.find({where:{id: id}})

        if (itens.length < 1) return

        itens[0].idUserSelecao = itens[0].idUserSelecao == 0 ? user.userId : 0

        const item = await this.repo.save({id: itens[0].id, idUserSelecao: itens[0].idUserSelecao})

        return {id: item.id, idUserSelecao: item.idUserSelecao}

    }

}