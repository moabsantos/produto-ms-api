
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

    async validate(dto, user: number): Promise<any>{

        if (!dto.id && !dto.name){
            return this.getMessage(null, user, this, {status: false, error: true, message: "Id e nome não informado"})
        }

        return super.validate(dto, user)
    }

    async validateId(service: BaseCrudService, id: any, user: any): Promise<any>{

        if (!id) return this.getMessage(null, user, this, {status: false, error: true, message: "Id não informado"})

        const listService = await service.findByWhere({
            id: id,
            realmId: user.realmId
        })

        if (listService.length == 0){
            return this.getMessage(null, user, this, {status: false, error: true, message: "Id informado não é válido"})
        }

        return listService[0]
    }

    async foundDuplicated(dto: any, user: any): Promise<any> {

        if (!dto.name) return {status: false, error: true, message: "Nome não informado"}

        let modelRepo = await this.repo.findOne({where:{name:dto.name, realmId: user.realmId}})
        
        if(modelRepo && (!dto.id || dto.id != modelRepo.id)) return {status: true, error: true, message: "Cadastro localizado para o usuário"}

        return {status: false, message: "Duplicação não encontrada"}
    }


    async foundDuplicatedCodeName(dto: any, user: any): Promise<any> {

        if (!dto.name || !dto.code) return {status: true, message: "Nome ou código não informado"}

        let modelRepo = await this.repo.findOne({where:{name:dto.name, code:dto.code, realmId: user.realmId}})
        
        if(modelRepo && (!dto.id || dto.id != modelRepo.id)) return {status: true, message: "Cadastro localizado com outro id"}

        return {status: false, message: "Duplicação não encontrada"}
    }

    validateFieldsRequireds(roler, dto): any{

        if (!roler) return {status: true}

        roler.forEach(f => {
            if (!dto[f.name]) return this.getMessage(null, null, this, {status: false, error: true, message: `${f.name} sem valor informado`})
        });

        return {status: true}
    }

    async validateModelsRequired(dto: any, user: any): Promise<any>{

        if (!this.modelsRequired) return this.getMessage(null, user, this, {status: false, error: true, message: "modelsRequired não encontrado"})

        if (this.modelsRequired.length == 0) return this.getMessage(null, user, this, {status: true, message: "Não encontrado modelsRequired para validar"})

        for (let index = 0; index < this.modelsRequired.length; index++) {
            
            const d = this.modelsRequired[index];

            d.objeto = {}
            this[d.fieldName] = {}

            const idFunc = d.getId ? d.getId() : 0

            const fieldKey = d.fieldKey ? d.fieldKey : d.fieldName + 'Id'

            const idDto = dto[fieldKey] ? dto[fieldKey] : idFunc

            if (d.optional && (!idDto || idDto == "")) continue
            
            d.objeto = await this.validateId(d.service, idDto, user)

            if (!d.objeto) return this.getMessage(null, user, this, {status: false, error: true, message: `O id ${idDto} informado no atributo ${d.fieldName}Id não é válido`})

            this[d.fieldName] = d.objeto

        }

        return this.getMessage(null, user, this, {status: true, message: "ValidateModelsRequired ok"})
    }

    getModelFromInputs(model, dto, inputs){

        inputs.forEach(f => {
            model[f] = dto[f] 
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

        if (!fields) return model
        
        fields.forEach(f => {
            const fieldDestino = prefixFieldDestination ? prefixFieldDestination + f.charAt(0).toUpperCase() + f.slice(1) : f
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

        const item = await this.updateRepoId(req, user, {id: itens[0].id, idUserSelecao: itens[0].idUserSelecao})

        return {id: item.id, idUserSelecao: item.idUserSelecao}

    }

}