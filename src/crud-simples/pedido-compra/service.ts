import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoCompra } from "./crud.entity";
import { PedidoCompraUser } from "./crud-user.entity";
import { EmpresaService } from "../empresa/service";
import { DepositoService } from "../deposito/service";
import { FornecedorService } from "../fornecedor/service";
import { FormaPagamentoService } from "../forma-pagamento/service";

export class PedidoCompraService extends BaseCrudService{

    private empresa: any;
    private depositoOrigem: any;
    private depositoDestino: any;
    private fornecedor: any;
    private formaPagamento: any;
    
    constructor (
        @InjectRepository(PedidoCompra) protected repo,
        @InjectRepository(PedidoCompraUser) protected repoUser,
        private empresaServ: EmpresaService,
        private fornecedorServ: FornecedorService,
        private formaPagamentoServ: FormaPagamentoService,
        private depositoServ: DepositoService)
    {
        super(repo, repoUser)
        
        this.setRole({
            create: "sup-compr-ped-dig",
            update: "sup-compr-ped-dig",
            delete: "sup-compr-ped-dig",
            get: "sup-compr-ped-dig",
            aprovar: "sup-compr-ped-aprov",
            atender: "sup-compr-ped-aten",
        })
    }

    getDataFromDto(dto: any, user: any, model: PedidoCompra){
 
        model.dataSolicitacao = dto.dataSolicitacao

        model.empresaName = this.empresa.name
        model.empresaSigla = this.empresa.sigla
        model.empresaId = dto.empresaId

        model.fornecedorName = this.fornecedor.name
        model.fornecedorCode = this.fornecedor.code
        model.fornecedorSigla = this.fornecedor.sigla
        model.fornecedorId = dto.fornecedorId



        model.formaPagamentoName = this.formaPagamento.name
        model.formaPagamentoCode = this.formaPagamento.code
        model.formaPagamentoSigla = this.formaPagamento.sigla
        model.formaPagamentoId = dto.formaPagamentoId

        model.depositoNameOrigem = this.depositoOrigem.name
        model.depositoCodeOrigem = this.depositoOrigem.code
        model.depositoSiglaOrigem = this.depositoOrigem.sigla
        model.depositoIdOrigem = dto.depositoIdOrigem

        model.depositoNameDestino = this.depositoDestino.name
        model.depositoCodeDestino = this.depositoDestino.code
        model.depositoSiglaDestino = this.depositoDestino.sigla
        model.depositoIdDestino = dto.depositoIdDestino

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        this.empresa = await this.validateId(this.empresaServ, dto.empresaId, user)
        if (!this.empresa){
            this.logger.error(`A empresa ${dto.empresaId} não foi encontrada`)
            return false
        }

        this.fornecedor = await this.validateId(this.fornecedorServ, dto.fornecedorId, user)
        if (!this.fornecedor){
            this.logger.error(`O Fornecedor ${dto.fornecedorId} não foi encontrado`)
            return false
        }

        this.formaPagamento = await this.validateId(this.formaPagamentoServ, dto.formaPagamentoId, user)
        if (!this.formaPagamento){
            this.logger.error(`A Forma de Pagamento ${dto.formaPagamentoId} não foi encontrada`)
            return false
        }

        this.depositoOrigem = await this.validateId(this.depositoServ, dto.depositoIdOrigem, user)
        if (!this.depositoOrigem){
            this.logger.error(`O Depósito ${dto.depositoIdOrigem} não foi encontrado`)
            return false
        }

        this.depositoDestino = await this.validateId(this.depositoServ, dto.depositoIdDestino, user)
        if (!this.depositoDestino){
            this.logger.error(`O Depósito ${dto.depositoIdDestino} não foi encontrado`)
            return false
        }

        return super.validate(dto, user)
    }

}