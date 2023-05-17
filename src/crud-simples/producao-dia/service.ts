import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { ProducaoDia } from "./crud.entity";
import { ProducaoDiaUser } from "./crud-user.entity";
import { UnidadeMedidaService } from "../unidade-medida/service";
import { SetorService } from "../setor/service";
import { EmpresaService } from "../empresa/service";
import { ProdutoService } from "../produto/service";

export class ProducaoDiaService extends BaseCrudService{

    private empresa: any;
    private itemProducao: any;
    private setor: any;
    private unidadeMedida: any;

    constructor (
        @InjectRepository(ProducaoDia) protected repo,
        @InjectRepository(ProducaoDiaUser) protected repoUser,
        private itemServ: ProdutoService,
        private unidadeServ: UnidadeMedidaService,
        private setorServ: SetorService,
        private empresaServ: EmpresaService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: ProducaoDia){

        model.empresaId = this.empresa.id

        let date: Date = new Date(dto.data);
        model.data = date
        model.ano = date.getFullYear()
        model.mes = date.getMonth()+1

        model.setorId = this.setor.id
        model.setorName = this.setor.name
        model.setorSigla = this.setor.sigla

        model.itemProducaoId = this.itemProducao.id
        model.itemProducaoName = this.itemProducao.name
        model.flagServico = this.itemProducao.flagServico

        model.unidadeMedidaId = dto.unidadeMedidaId
        model.unidadeMedidaName = this.unidadeMedida.name
        model.unidadeMedidaSigla = this.unidadeMedida.sigla

        model.quantidadeRealizada = 0
        if (dto.quantidadeRealizada)
            model.quantidadeRealizada = dto.quantidadeRealizada

        model.valorRealizado = 0
        if (dto.valorRealizado)
            model.valorRealizado = dto.valorRealizado

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const itemDespesa = await this.itemServ.findByWhere({
            id: dto.itemProducaoId,
            realmId: user.realmId
        })

        if (itemDespesa.length == 0){
            this.logger.error(`O item de Despesa ${dto.itemDespesaId} não foi encontrado`)
            return false
        }
        this.itemProducao = itemDespesa[0]

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

        dto.name = this.empresa.id +' - '+this.setor.id +' - '+ this.itemProducao.id +' - '+dto.data  
        dto.description = '*'
        return super.validate(dto, user)

    }

}