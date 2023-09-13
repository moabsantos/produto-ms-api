import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { DominioImagem } from "./crud.entity";
import { DominioImagemUser } from "./crud-user.entity";
import { DominioColecaoService } from "../dominio-colecao/service";

export class DominioImagemService extends BaseCrudService{

    constructor (
        @InjectRepository(DominioImagem) protected repo,
        @InjectRepository(DominioImagemUser) protected repoUser,
        private dominioColecaoServ: DominioColecaoService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "sup-dominio-imagem-dig",
            update: "sup-dominio-imagem-dig",
            delete: "sup-dominio-imagem-dig",
            get: "sup-dominio-imagem-dig"
        })

        this.modelsRequired = [
            {fieldName: 'dominioColecao', service: this.dominioColecaoServ, fields: ['id']}
        ]
    }

    getDataFromDto(dto: any, user: any, model: DominioImagem){

        if (!model.id) {
            model = this.getDataModelsFromDto(model)
            model.dominioName = dto.dominioName
            model.dominioId = dto.dominioId
            model.fileName = dto.fileName
        }

        model.flagCapa = dto.flagCapa ? dto.flagCapa : 0

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!dto.id) {
            if (!dto.dominioName) return false
            if (!dto.dominioId) return false
            if (!dto.fileName) return false
        }

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid) return false

        dto.name = 
            'RELM_'+ user.realmId +
            '_COL_ID_'+ dto.dominioColecaoId +
            '_DOM_'+ dto.dominioName +
            '_DOM_ID_'+ dto.dominioId +
            '_FILE_NAME_'+ dto.fileName +
            '_DATE_'+ this.dataFormatada({data: new Date(), isDate: true, formato: 'YYYYmmddHHmiss'})

        dto.code = dto.name

        return super.validate(dto, user)
    }

    async setFlagCapa(req: any, user: any, dto: any): Promise<any>{

        let img = await this.getById(req, user, {id: dto.id})
        if (!img) return

        img.flagCapa = dto.flagCapa == 1 ? true : false
        await this.save(req, user, img)

        const imgs = await this.repo.find({where:{realmId: user.realmId, dominioName: img.dominioName, dominioId: img.dominioId}})
        for (let index = 0; index < imgs.length; index++) {
            const imagem = imgs[index]
            if (imagem.id == img.id) continue

            imagem.flagCapa = 0
            await this.save(req, user, imagem)
        }

        return img
    }

}