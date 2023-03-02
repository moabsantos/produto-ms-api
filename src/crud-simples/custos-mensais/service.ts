import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { CustosMensais } from "./crud.entity";
import { CustosMensaisUser } from "./crud-user.entity";
import { ProdutoService } from "../produto/service";
import { UnidadeMedidaService } from "../unidade-medida/service";
import { SetorService } from "../setor/service";
import { EmpresaService } from "../empresa/service";

export class CustosMensaisService extends BaseCrudService{

    private empresa: any;
    private itemDespesa: any;
    private setor: any;
    private unidadeMedida: any;

    constructor (
        @InjectRepository(CustosMensais) protected repo,
        @InjectRepository(CustosMensaisUser) protected repoUser,
        private itemServ: ProdutoService,
        private unidadeServ: UnidadeMedidaService,
        private setorServ: SetorService,
        private empresaServ: EmpresaService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: CustosMensais){

        model.empresaId = this.empresa.id

        model.ano = dto.ano
        model.mes = dto.mes
        model.periodo = `${dto.mes} / ${dto.ano}`

        model.setorId = this.setor.id
        model.setorName = this.setor.name
        model.setorSigla = this.setor.sigla

        model.itemDespesaId = this.itemDespesa.id
        model.itemDespesaName = this.itemDespesa.name
        model.flagServico = this.itemDespesa.flagServico

        model.unidadeMedidaId = dto.unidadeMedidaId
        model.unidadeMedidaName = this.unidadeMedida.name
        model.unidadeMedidaSigla = this.unidadeMedida.sigla

        model.quantidadeRealizada = 0
        if (dto.quantidadeRealizada)
            model.quantidadeRealizada = dto.quantidadeRealizada

        model.valorRealizado = 0
        if (dto.valorRealizado)
            model.valorRealizado = dto.valorRealizado

        dto.name = `realm ${user.realmId} empresa ${this.empresa.id} periodo ${dto.mes}/${dto.ano} item ${this.itemDespesa.id}`  
        dto.description = '*'

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!user){
            this.logger.error("login is requerid")
            return
        }

        const itemDespesa = await this.itemServ.findByWhere({
            id: dto.itemDespesaId,
            realmId: user.realmId
        })

        if (itemDespesa.length == 0){
            this.logger.error(`O item de Despesa ${dto.itemDespesaId} não foi encontrado`)
            return false
        }
        this.itemDespesa = itemDespesa[0]

        const unidMedida = await this.unidadeServ.findByWhere({
            id: dto.unidadeMedidaId,
            realmId: user.realmId
        })

        if (unidMedida.length == 0){
            this.logger.error(`A unidade de medida ${dto.unidadeMedidaId} não foi encontrada`)
            return false
        }
        this.unidadeMedida = unidMedida[0]

        const setor = await this.setorServ.findByWhere({
            id: dto.setorId,
            realmId: user.realmId
        })

        if (setor.length == 0){
            this.logger.error(`O setor ${dto.setorId} não foi encontrado`)
            return false
        }
        this.setor = setor[0]

        const emp = await this.empresaServ.findByWhere({
            id: dto.empresaId,
            realmId: user.realmId
        })

        if (emp.length == 0){
            this.logger.error(`A empresa ${dto.empresaId} não foi encontrada`)
            return false
        }
        this.empresa = emp[0]

        return true

    }

}