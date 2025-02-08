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

    valorValido(valor: any, valorRetorno: any = false): any{

        if (valor == undefined)
            return valorRetorno

        if (valor == null)
            return valorRetorno

        if (isNaN(valor))
            return valorRetorno

        return valorRetorno === false ? true : valor
    }

    async validate(dto: any, user: any): Promise<any>{

        if (!user) return this.getMessage(null, user, this, {status: false, error: true, message: "Login é exigido"})

        if (!user.userId) this.getMessage(null, user, this, {status: false, error: true, message: "Id do Login é exigido"})

        if (!user.realmId) this.getMessage(null, user, this, {status: false, error: true, message: "Realm é exigido"})

        if (!dto.id) return await user.hasPermissao(this.roleService.create)
        if (dto.id) return await user.hasPermissao(this.roleService.update)

        return this.getMessage(null, user, this, {status: true, message: "validação ok"})
        
    }

    async foundDuplicated(dto: any, user: any): Promise<any>{

        return {status: false, error: true, message: "Custom DTO"}
    }

    getDataFromDto(dto: any, user: any, model: BaseModel){
        return model
    }

    async afterSave(req: any, dto: any, user: any, model: BaseModel){
        return model
    }

    getIdsAutorizados(w: any): Promise<BaseModel[]> {
  
        let ids = []
        ids.push({id:0})
        return Promise.resolve(ids)
    }

    getFieldsResumo(){
        return []
    }

    async resumoValores(req: CrudRequest, user: any){

        let retorno = {

        }

        const res = await this.get(req, user)

        const fieldsResumo = this.getFieldsResumo()

        let keysCustom = false

        if (res?.data && res?.data?.length > 0) res.data.forEach(element => {

            for (let index = 0; index < fieldsResumo.length; index++) {
                const fieldResumo = fieldsResumo[index];
                let customGrupo = fieldResumo.groupName
                let fieldName = element[fieldResumo.fieldName]

                if (fieldResumo.customGrupo && fieldResumo.customField) {

                    keysCustom = true

                    let customGrupo = fieldResumo.customGrupo(element)
                    let fields = fieldResumo.customField(element)

                    if (!retorno[customGrupo]) retorno[customGrupo] = {
                        ...fields
                    }

                    if (!retorno[customGrupo][fieldResumo.fieldValue]) retorno[customGrupo][fieldResumo.fieldValue] = 0

                    let valor = retorno[customGrupo][fieldResumo.fieldValue]

                    retorno[customGrupo][fieldResumo.fieldValue] = valor + Number(element[fieldResumo.fieldValue])

                }else{

                    if (!retorno[customGrupo]) retorno[customGrupo] = {}
                
                    if (!retorno[customGrupo][fieldName]) retorno[customGrupo][fieldName] = {}
    
                    if (!retorno[customGrupo][fieldName][fieldResumo.fieldValue]) retorno[customGrupo][fieldName][fieldResumo.fieldValue] = 0
                    
                    let valor = retorno[customGrupo][fieldName][fieldResumo.fieldValue]
    
                    retorno[customGrupo][fieldName][fieldResumo.fieldValue] = this.numeroFormatado({ valor: valor + Number(element[fieldResumo.fieldValue]) })

                }

            }

        });

        if (keysCustom){
            let novoRetorno = []

            for (const [key, value] of Object.entries(retorno)) {
                novoRetorno.push(value)
            }

            return {data:novoRetorno}
        }

        return retorno

    }

    async get(req: CrudRequest, user: any, id?: number): Promise<any>{

        const userHasPermissao = await user.hasPermissao(this.roleService.get)
  
        if (userHasPermissao == false || userHasPermissao.status == false){
            return this.getMessage(req, user, this, {
                status: false, error: true,
                message: "Usuário "+ user.id +" não autorizado ("+this.roleService.get+") a esta busca no contexto "+ user.realmId,
                data: []
            })
        }

        let w: any;
        w = {userId: user.userId}

        if (id){
            w = {...w, originId: id}
        }

        let userModel = await this.getIdsAutorizados(w)

        if (!userModel){
            return {
                msgGeral: "Não há dados autorizados para visualização (R1)",
                data: []
            }
        }

        if (this.valorValido(id)){
            
            const data = await this.repo.find({where:{id:id}})

            if (!data || data.length == 0) return {
                msgGeral: "Não há dados autorizados para visualização (R2)",
                data: []
            }

            if (data && data[0]['realmId'] != user.realmId){
                return {
                    msgGeral: "Não há dados autorizados para visualização (R3)",
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
        let posRealms = []

        for (let index = 0; index < req.parsed.search['$and'].length; index++) {

            const element = req.parsed.search['$and'][index];

            if (element && element["realmId"]) req.parsed.search['$and'][index] = {
                realmId:{
                    $eq:user.realmId
                }
            }

            if (!element) req.parsed.search['$and'][index] = {
                realmId:{
                    $eq:user.realmId
                }
            }
        }

        req.parsed.search['$and'].forEach(element => {
            if (!filtroRealm) filtroRealm = element && element["realmId"] && JSON.stringify(element["realmId"]) == JSON.stringify({$eq:user.realmId})
        });

        if (!filtroRealm || !user.realmId) return {
            msgGeral: "Filtro sem Relm",
            user: user,
            andRuler: req.parsed.search['$and'],
            filterRealm: req.options.query.filter,
            data: []
        }

        try {
            const startDB = new Date()
            let modelsFound = await this.getMany(req)
            const endDB = new Date()

            return {
                msgGeral: "Resultado para filtro sem o id único",
                success: true, error: false,
                
                startDB: startDB,
                endDB: endDB,
                processDB: endDB.getTime() - startDB.getTime(),

                data: modelsFound
            }
        } catch (error) {
            return {
                msgGeral: "Esta consulta não está disponível",
                success: false, error: true,
                data: []
            }
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

                return {
                    success: {
                        id: dto.id,
                        messages: [
                            `${this.constructor.name}:Id ${dto.id} não pode ser salvo por estar duplicado.`
                        ]
                    }
                }
            }

            if (!modelRepoFound || !modelRepoFound[0]) return this.getMessage(req, user, this, {status: false, message: "Não encontrado cadastro para o id informado"})

        }

        const validated = await this.validate(dto, user)

        if (validated == false) return this.getMessage(req, user, this, {status: false, error: true, message: "Custom: Id e nome não informado"})

        if (validated != true && !validated.status) return validated

        const checkDuplicacao = await this.foundDuplicated(dto, user)
        if (checkDuplicacao.status || checkDuplicacao.error) return checkDuplicacao

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
        modelRepo = modelRepo.id ? await this.updateRepoId(req, user, modelRepo) : await this.repo.save(modelRepo)

        this.afterSave(req, dto, user, modelRepo)

        const tipoEvento = dto.id ? "atualizado" : "incluído"

        return { success: {
            id: modelRepo.id,
            updated_at: modelRepo.updated_at ? modelRepo.updated_at  : modelRepo.created_at,
            messages: [
                `${this.constructor.name}:Id ${modelRepo.id} ${tipoEvento} com sucesso.`
            ]
        }} 

    }

    async updateRepoId(req: CrudRequest, user: any, payload: any) {

        payload.updated_at = new Date()
        await this.repo.update({id: payload.id}, payload)
        return payload
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

        if (!modelFound || !modelFound.data || modelFound.data.length != 1) return

        if (modelFound.data[0].realmId != user.realmId) return

        modelFound.data[0].deleted_at = new Date()
        modelFound.data[0].deleted_by = user.userId

        await this.updateRepoId(req, user, modelFound.data[0])
        
        return {status: true, error: false, id: modelFound.data[0].id, message: "Exclusão realizada"}
    }


    async reActive(req: CrudRequest, user: any, id: number){

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

        if (!modelFound || !modelFound.data || modelFound.data.length != 1) return

        if (modelFound.data[0].realmId != user.realmId) return

        modelFound.data[0].deleted_at = null
        modelFound.data[0].deleted_by = null

        modelFound.data[0].updated_at = new Date()
        modelFound.data[0].updated_by = user.userId

        await this.updateRepoId(req, user, modelFound.data[0])
        
        return {status: true, error: false, id: modelFound.data[0].id}
    }

    numeroFormatado(dto: any){
        if (!dto.valor) return 0

        let casasDecimais = 2
        if (dto.casasDecimais) casasDecimais = dto.casasDecimais

        let fator = 1

        for (let index = 1; index <= casasDecimais; index++) {
            fator = fator * 10
        }

        const valor = (Math.trunc((dto.valor * fator) + 0.5)) / fator

        return valor
    }

    getProximoVencimento({dataVencimento1, intervalo, proximaParcela}){

        if (!intervalo) intervalo = "mensal"
        intervalo = intervalo.replace(/\s/g, '')

        proximaParcela = proximaParcela -1

        let date: Date = dataVencimento1
        let dt = date
        let diaM = dt.getDate()
        let ano = dt.getFullYear()
        let mes = dt.getMonth()+1

        if (intervalo.toUpperCase().startsWith("DIAS:")){
            let dias = intervalo.split(':')
            dias = dias[1].split(',')

            let idxDias = 0
            for (let index = 0; index <= proximaParcela; index++) {
                if (idxDias >= dias.length) idxDias = 0

                if (idxDias > 0 && dias[idxDias] <= dias[idxDias-1]) mes = mes +1

                if (idxDias == 0 && index > 0) mes = mes +1

                if (mes > 12) {
                    mes = 1
                    ano = ano +1
                }


                if (index < proximaParcela) idxDias = idxDias +1
            }
            
            return this.dataFormatada({isDate: false, data: `${ano}-${mes}-${dias[idxDias]}`})
        }

        if (intervalo == "mensal") {

            if (proximaParcela + mes <= 12) return this.dataFormatada({isDate: false, data: `${ano}-${proximaParcela + mes}-${diaM}`})

            while (proximaParcela + mes > 12){
                proximaParcela = proximaParcela + mes
                mes = 0

                proximaParcela = proximaParcela - 12
                ano = ano + 1
            }
        }

        return this.dataFormatada({isDate: false, data: `${ano}-${proximaParcela + mes}-${diaM}`})

    }

    dataFormatada(dto: any){
        if (!dto.data) return ''
        let date: Date = dto.isDate ? dto.data : new Date(dto.data.split('-'));
        let dt = date
        let diaM = dt.getDate()
        let ano = dt.getFullYear()
        let mes = dt.getMonth()+1

        let hora = dt.getHours()
        let minuto = dt.getMinutes()
        let segundo = dt.getSeconds()
        let milliseconds = dt.getMilliseconds();

        let novaData = dto.formato
        if (!novaData) novaData = "YYYY-mm-dd HH:mi:ss"

        novaData = novaData.replace('dd', diaM.toString().padStart(2, '0'))
        novaData = novaData.replace('mm', mes.toString().padStart(2, '0'))
        novaData = novaData.replace('YYYY', ano)

        novaData = novaData.replace('HH', hora)
        novaData = novaData.replace('mi', minuto)

        if (novaData.indexOf('sss')) novaData = novaData.replace('sss', milliseconds)
        novaData = novaData.replace('ss', segundo)

        return novaData
    }

    getMessage(req, user, origin, payload){

        return {
            status: payload.status,
            message: payload.message,
        }
    }
}