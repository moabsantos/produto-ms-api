import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { DepositoItem } from "./crud.entity";
import { DepositoItemUser } from "./crud-user.entity";

import { EmpresaService } from "../empresa/service";
import { ProdutoService } from "../produto/service";
import { UnidadeMedidaService } from "../unidade-medida/service";
import { DepositoService } from "../deposito/service";
import { ProdutoGrupoService } from "../produto-grupo/service";

export class DepositoItemService extends BaseCrudService{

    constructor (
        @InjectRepository(DepositoItem) protected repo,
        @InjectRepository(DepositoItemUser) protected repoUser,
        private empresaServ: EmpresaService,
        private itemServ: ProdutoService,
        private itemGrupoServ: ProdutoGrupoService,
        private unidadeMedidaServ: UnidadeMedidaService,
        private depositoServ: DepositoService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "sup-deposito-item-dig",
            update: "sup-deposito-item-dig",
            delete: "sup-deposito-item-dig",
            get: "sup-deposito-item-dig"
        })

        this.modelsRequired = [
            {fieldName: 'deposito', service: this.depositoServ, fields: ['name', 'sigla', 'id', 'code']},
            {fieldName: 'empresa', service: this.empresaServ, fields: ['name', 'sigla', 'id', 'code'], getId: () => this['deposito'].empresaId},
            {fieldName: 'item', service: this.itemServ, fields: ['name', 'sigla', 'id', 'code', 'description']},
            {fieldName: 'itemGrupo', service: this.itemGrupoServ, fields: ['name', 'sigla', 'id', 'code'], getId: () => this['item'].produtoGrupoId},
            {fieldName: 'unidadeMedida', service: this.unidadeMedidaServ, fields: ['name', 'sigla', 'id', 'code']}
        ]
    }

    getDataFromDto(dto: any, user: any, model: DepositoItem){

        model = this.getDataModelsFromDto(model)

        model.quantidadeMinima = dto.quantidadeMinima
        model.quantidadeMaxima = dto.quantidadeMaxima

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid) return false

        dto.name = 'DEP'+ dto.depositoId +' - ITEM'+ dto.itemId +' - UND'+  dto.unidadeMedidaId 
        dto.code = dto.name

        return super.validate(dto, user)
    }

}