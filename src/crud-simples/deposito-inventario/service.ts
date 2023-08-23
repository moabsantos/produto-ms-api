import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { DepositoInventario } from "./crud.entity";
import { DepositoInventarioUser } from "./crud-user.entity";

import { EmpresaService } from "../empresa/service";
import { ProdutoService } from "../produto/service";
import { DepositoService } from "../deposito/service";
import { ProdutoGrupoService } from "../produto-grupo/service";

export class DepositoInventarioService extends BaseCrudService{

    constructor (
        @InjectRepository(DepositoInventario) protected repo,
        @InjectRepository(DepositoInventarioUser) protected repoUser,
        private empresaServ: EmpresaService,
        private itemServ: ProdutoService,
        private itemGrupoServ: ProdutoGrupoService,
        private depositoServ: DepositoService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "sup-deposito-inventario-dig",
            update: "sup-deposito-inventario-dig",
            delete: "sup-deposito-inventario-dig",
            get: "sup-deposito-inventario-dig"
        })

        this.modelsRequired = [
            {fieldName: 'deposito', service: this.depositoServ, fields: ['name', 'sigla', 'id', 'code']},
            {fieldName: 'depositoInventario', service: this.depositoServ, fields: ['name', 'sigla', 'id', 'code']},
            {fieldName: 'empresa', service: this.empresaServ, fields: ['name', 'sigla', 'id', 'code'], getId: () => this['deposito'].empresaId},
            {fieldName: 'item', optional: true, service: this.itemServ, fields: ['name', 'sigla', 'id', 'code', 'description']},
            {fieldName: 'itemGrupo', service: this.itemGrupoServ, fields: ['name', 'sigla', 'id', 'code']}
        ]
    }

    getDataFromDto(dto: any, user: any, model: DepositoInventario){

        if (!model.status || model.status == 'Pendente') {
            model = this.getDataModelsFromDto(model)
            model.dataInicio = dto.dataInicio
            model.status = 'Pendente'
        }

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid) return false

        if (this['deposito'].empresaId != this['depositoInventario'].empresaId) return false

        dto.name = 'RELM_'+ this['empresa'].realmId +'_EMP_'+ this['empresa'].id +'_DEP_'+ dto.depositoId +'_DT_'+ this.dataFormatada({data: dto.dataInicio, formato: 'YYYYmmddHHmiss'})
        if (dto.itemGrupoId) dto.name = dto.name +'_ITEMGRUPO_'+ dto.itemGrupoId
        if (dto.itemId) dto.name = dto.name +'_ITEM_'+ dto.itemId
        dto.code = dto.name

        return super.validate(dto, user)
    }

}